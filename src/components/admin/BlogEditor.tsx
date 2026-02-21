import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image, Upload, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import TipTapEditor from '@/components/admin/TipTapEditor';
import BlogPreview from '@/components/admin/BlogPreview';

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
  category?: string | null;
  tags?: string[] | null;
}

interface BlogEditorProps {
  blog: Blog | null;
  onClose: () => void;
}

const CATEGORIES = [
  'Technology', 'Web Development', 'Mobile Development', 'AI & Machine Learning',
  'Cloud Computing', 'Cybersecurity', 'DevOps', 'UI/UX Design', 'Business', 'Tutorial',
];

export default function BlogEditor({ blog, onClose }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [content, setContent] = useState(blog?.content || '');
  const [coverImage, setCoverImage] = useState(blog?.cover_image || '');
  const [category, setCategory] = useState(blog?.category || '');
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isPublished, setIsPublished] = useState(blog?.published || false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!blog) setSlug(generateSlug(value));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage.from('blog-images').upload(fileName, file);

    if (error) {
      toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
    } else {
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setCoverImage(publicUrl);
      toast({ title: 'Success', description: 'Image uploaded successfully' });
    }
    setUploading(false);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async (publish: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      toast({ title: 'Error', description: 'Title and content are required', variant: 'destructive' });
      return;
    }

    setSaving(true);

    const blogData = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      category: category || null,
      tags: tags.length > 0 ? tags : [],
      published: publish || isPublished,
      published_at: publish ? new Date().toISOString() : blog?.published_at,
      author_id: user?.id,
    };

    let error;
    if (blog) {
      const { error: updateError } = await supabase.from('blogs').update(blogData).eq('id', blog.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('blogs').insert(blogData);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: publish ? 'Blog published successfully' : 'Blog saved successfully' });
      onClose();
    }
  };

  if (showPreview) {
    return (
      <BlogPreview
        title={title}
        excerpt={excerpt}
        content={content}
        coverImage={coverImage}
        category={category}
        tags={tags}
        onClose={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="glass" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="hero" onClick={() => handleSave(true)} disabled={saving}>
              {blog?.published ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title..."
              className="text-2xl font-display font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="url-friendly-slug" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Tags</label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button variant="outline" onClick={addTag} type="button">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <Image className="w-4 h-4 inline mr-2" />
              Cover Image
            </label>
            <div className="flex gap-2">
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Image URL or upload..."
                className="flex-1"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {coverImage && (
              <div className="relative mt-2 inline-block">
                <img src={coverImage} alt="Cover preview" className="rounded-lg max-h-48 object-cover" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 bg-background/80"
                  onClick={() => setCoverImage('')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Excerpt</label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the blog post..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Content</label>
            <TipTapEditor content={content} onChange={setContent} placeholder="Write your blog content here..." />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
