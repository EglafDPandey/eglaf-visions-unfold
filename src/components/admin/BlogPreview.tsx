import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPreviewProps {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  onClose: () => void;
}

export default function BlogPreview({
  title, excerpt, content, coverImage, category, tags, onClose,
}: BlogPreviewProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
          <Badge variant="outline" className="text-primary border-primary">
            Preview Mode
          </Badge>
        </div>
      </header>

      <section className="pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{today}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />5 min read
              </span>
              {category && (
                <Badge variant="secondary">{category}</Badge>
              )}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title || 'Untitled Post'}
            </h1>
            {excerpt && <p className="text-xl text-muted-foreground mb-4">{excerpt}</p>}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {coverImage && (
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img src={coverImage} alt={title} className="w-full rounded-xl shadow-2xl" />
            </div>
          </div>
        </section>
      )}

      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-xl">
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }}
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
