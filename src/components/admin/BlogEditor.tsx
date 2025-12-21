import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

interface BlogEditorProps {
  blog: Blog | null;
  onClose: () => void;
}

export default function BlogEditor({ blog, onClose }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [content, setContent] = useState(blog?.content || '');
  const [coverImage, setCoverImage] = useState(blog?.cover_image || '');
  const [isPublished, setIsPublished] = useState(blog?.published || false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!blog) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Error',
        description: 'Title and content are required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    const blogData = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      published: publish || isPublished,
      published_at: publish ? new Date().toISOString() : blog?.published_at,
      author_id: user?.id,
    };

    let error;
    if (blog) {
      const { error: updateError } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', blog.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('blogs').insert(blogData);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: publish ? 'Blog published successfully' : 'Blog saved successfully',
      });
      onClose();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="glass" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="hero" onClick={() => handleSave(true)} disabled={saving}>
              <Eye className="w-4 h-4 mr-2" />
              {blog?.published ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title..."
              className="text-2xl font-display font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Slug
            </label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Image className="w-4 h-4 inline mr-2" />
              Cover Image URL
            </label>
            <Input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                className="mt-2 rounded-lg max-h-48 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Excerpt
            </label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the blog post..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Content
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={20}
              className="font-mono text-sm"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
