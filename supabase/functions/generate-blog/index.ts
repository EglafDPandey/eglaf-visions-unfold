// Generate AI blog draft (text + cover image) and save as unpublished
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SERVICES = [
  { name: "Custom Software Development", category: "Technology" },
  { name: "Mobile App Development", category: "Mobile Development" },
  { name: "Web Development", category: "Web Development" },
  { name: "AI Solutions", category: "AI & Machine Learning" },
  { name: "CRM Development", category: "Business" },
  { name: "SEO Services", category: "Tutorial" },
];

function pickService() {
  return SERVICES[Math.floor(Math.random() * SERVICES.length)];
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function extractJSON(text: string): any {
  // Try fenced first
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence ? fence[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found");
  return JSON.parse(raw.slice(start, end + 1));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    let count = 1;
    let mode: "full" | "cover" = "full";
    let blogId: string | null = null;
    let customPrompt: string | null = null;
    try {
      const body = await req.json();
      if (body?.count && Number.isInteger(body.count)) {
        count = Math.min(Math.max(body.count, 1), 5);
      }
      if (body?.mode === "cover") mode = "cover";
      if (body?.blogId && typeof body.blogId === "string") blogId = body.blogId;
      if (body?.prompt && typeof body.prompt === "string") customPrompt = body.prompt;
    } catch (_) {}

    // Helper: generate + upload a cover image, returns public URL
    const generateCover = async (prompt: string): Promise<string | null> => {
      const imgResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: `${prompt}. Wide 16:9 cover image, no text or letters in the image.` }],
          modalities: ["image", "text"],
        }),
      });
      if (!imgResp.ok) {
        console.error("Image generation failed:", imgResp.status, await imgResp.text());
        return null;
      }
      const imgData = await imgResp.json();
      const dataUrl: string | undefined =
        imgData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (!dataUrl?.startsWith("data:")) return null;
      const [meta, b64] = dataUrl.split(",");
      const mime = meta.match(/data:(.*?);base64/)?.[1] || "image/png";
      const ext = mime.split("/")[1] || "png";
      const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const fileName = `ai/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("blog-images")
        .upload(fileName, bin, { contentType: mime, upsert: true });
      if (upErr) {
        console.error("Image upload failed:", upErr.message);
        return null;
      }
      const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      return pub.publicUrl;
    };

    // Mode: regenerate cover only for an existing blog
    if (mode === "cover") {
      if (!blogId) throw new Error("blogId required for cover regeneration");
      // Fetch existing blog for prompt fallback
      const getRes = await fetch(
        `${SUPABASE_URL}/rest/v1/blogs?id=eq.${blogId}&select=title,excerpt,category`,
        { headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}` } },
      );
      const rows = await getRes.json();
      const existing = Array.isArray(rows) ? rows[0] : null;
      if (!existing) throw new Error("Blog not found");
      const prompt = customPrompt?.trim() ||
        `${existing.title}. ${existing.excerpt || ""} Modern IT, ${existing.category || "technology"}, cinematic lighting, photorealistic.`;
      const newUrl = await generateCover(prompt);
      if (!newUrl) throw new Error("Cover generation failed");
      const upd = await fetch(`${SUPABASE_URL}/rest/v1/blogs?id=eq.${blogId}`, {
        method: "PATCH",
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ cover_image: newUrl }),
      });
      if (!upd.ok) throw new Error(`Failed to update blog: ${await upd.text()}`);
      const updated = await upd.json();
      return new Response(
        JSON.stringify({ success: true, blog: updated[0], cover_image: newUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const created: any[] = [];

    for (let i = 0; i < count; i++) {
      const service = pickService();
      const today = new Date().toISOString().slice(0, 10);

      // 1) Generate blog content as JSON
      const sysPrompt = `You are a senior SEO content strategist for Eglaf Technology LLP, an IT company with 10+ years experience and 35+ delivered projects, specializing in Custom Software, Mobile Apps, Web Development, AI Solutions, CRM, and SEO services. Write expert, original, helpful blog content following Google's E-E-A-T and 2024+ helpful content guidelines.`;

      const userPrompt = `Generate a unique, SEO-optimized blog post for the IT industry, aligned with Eglaf's "${service.name}" service. Date context: ${today}. Pick a fresh, relevant trending angle (avoid generic titles).

Return ONLY valid JSON (no prose, no markdown fences) with this exact shape:
{
  "title": "string, <= 65 chars, includes a strong primary keyword",
  "slug": "kebab-case slug, <= 70 chars",
  "excerpt": "meta-description style summary, 140-160 chars",
  "tags": ["5-7 relevant lowercase tags"],
  "image_prompt": "vivid, photorealistic prompt (no text in image) for a 16:9 cover that visually represents the topic, modern tech aesthetic, cinematic lighting",
  "content_html": "Full article HTML 900-1300 words. Use semantic <h2> and <h3> headings (NEVER an <h1> — the title is the H1). Include an intro, 4-6 sections, bullet lists where useful, a short FAQ with 3 Q&A using <h3> for questions, and a final CTA paragraph mentioning Eglaf Technology. Use <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>. No inline styles, no scripts."
}`;

      const textResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: sysPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!textResp.ok) {
        const t = await textResp.text();
        if (textResp.status === 429) throw new Error("AI rate limit exceeded, try again later.");
        if (textResp.status === 402) throw new Error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
        throw new Error(`AI text generation failed: ${textResp.status} ${t}`);
      }

      const textData = await textResp.json();
      const rawContent = textData.choices?.[0]?.message?.content ?? "";
      const parsed = extractJSON(rawContent);

      const title = String(parsed.title || "").trim();
      const slug = slugify(parsed.slug || title) + "-" + Date.now().toString(36);
      const excerpt = String(parsed.excerpt || "").trim();
      const tags = Array.isArray(parsed.tags) ? parsed.tags.slice(0, 8).map((t: any) => String(t)) : [];
      const content = String(parsed.content_html || "").trim();
      const imagePrompt = String(parsed.image_prompt || `${title}, modern IT, cinematic`).trim();

      if (!title || !content) throw new Error("AI returned incomplete content");

      // 2) Generate cover image
      let coverImageUrl: string | null = null;
      try {
        coverImageUrl = await generateCover(imagePrompt);
      } catch (e) {
        console.error("Image step error:", e);
      }

      // 3) Insert blog as DRAFT (published = false)
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/blogs`, {
        method: "POST",
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImageUrl,
          category: service.category,
          tags,
          published: false,
          published_at: null,
        }),
      });

      if (!insertRes.ok) {
        const errTxt = await insertRes.text();
        throw new Error(`Failed to save blog: ${errTxt}`);
      }
      const inserted = await insertRes.json();
      created.push(inserted[0]);
    }

    return new Response(
      JSON.stringify({ success: true, count: created.length, blogs: created }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-blog error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
