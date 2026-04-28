import { useEffect, useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SeoChecksProps {
  title: string;
  slug: string;
  excerpt: string;
  blogId?: string | null;
}

type Status = 'pass' | 'fail' | 'warn';

function StatusIcon({ status }: { status: Status }) {
  if (status === 'pass') return <Check className="w-4 h-4 text-green-500" />;
  if (status === 'warn') return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  return <X className="w-4 h-4 text-destructive" />;
}

function badgeClass(status: Status) {
  if (status === 'pass') return 'bg-green-500/15 text-green-500 border-green-500/30';
  if (status === 'warn') return 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30';
  return 'bg-destructive/15 text-destructive border-destructive/30';
}

export default function SeoChecks({ title, slug, excerpt, blogId }: SeoChecksProps) {
  const titleLen = title.trim().length;
  const excerptLen = excerpt.trim().length;
  const slugClean = slug.trim();

  const titleStatus: Status =
    titleLen >= 30 && titleLen <= 65 ? 'pass' : titleLen >= 20 && titleLen <= 70 ? 'warn' : 'fail';
  const excerptStatus: Status =
    excerptLen >= 120 && excerptLen <= 160 ? 'pass' : excerptLen >= 80 && excerptLen <= 180 ? 'warn' : 'fail';
  const slugFormatOk = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugClean) && slugClean.length <= 70;

  const [slugCheck, setSlugCheck] = useState<{ status: Status; msg: string }>({
    status: 'warn',
    msg: 'Checking…',
  });

  useEffect(() => {
    if (!slugClean) {
      setSlugCheck({ status: 'fail', msg: 'Slug is empty' });
      return;
    }
    if (!slugFormatOk) {
      setSlugCheck({ status: 'fail', msg: 'Use lowercase letters, numbers, and dashes (≤70)' });
      return;
    }
    let cancelled = false;
    setSlugCheck({ status: 'warn', msg: 'Checking uniqueness…' });
    const t = setTimeout(async () => {
      let q = supabase.from('blogs').select('id').eq('slug', slugClean).limit(1);
      if (blogId) q = q.neq('id', blogId);
      const { data, error } = await q.maybeSingle();
      if (cancelled) return;
      if (error) {
        setSlugCheck({ status: 'warn', msg: 'Could not verify uniqueness' });
      } else if (data) {
        setSlugCheck({ status: 'fail', msg: 'Slug already in use' });
      } else {
        setSlugCheck({ status: 'pass', msg: 'Unique slug' });
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [slugClean, slugFormatOk, blogId]);

  const checks = [
    {
      label: 'Title length',
      status: titleStatus,
      detail: `${titleLen} chars`,
      hint: 'Best: 30–65 characters',
    },
    {
      label: 'Slug',
      status: slugCheck.status,
      detail: slugClean || '—',
      hint: slugCheck.msg,
    },
    {
      label: 'Meta description',
      status: excerptStatus,
      detail: `${excerptLen} chars`,
      hint: 'Best: 120–160 characters',
    },
  ];

  const allPass = checks.every((c) => c.status === 'pass');

  return (
    <div className="glass-card rounded-xl p-4 border border-border/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground">SEO checks</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${
            allPass
              ? 'bg-green-500/15 text-green-500 border-green-500/30'
              : 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30'
          }`}
        >
          {allPass ? 'Ready to publish' : 'Review before publishing'}
        </span>
      </div>
      <ul className="space-y-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full border ${badgeClass(c.status)}`}>
              <StatusIcon status={c.status} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">{c.label}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[60%]" title={c.detail}>
                  {c.detail}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{c.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
