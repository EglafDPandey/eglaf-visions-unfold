import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
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
  category?: string | null;
  tags?: string[] | null;
}

interface AdminBlogsProps {
  onShowEditor: (blog: Blog | null) => void;
}

export default function AdminBlogs({ onShowEditor }: AdminBlogsProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch blogs',
        variant: 'destructive',
      });
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      });
      fetchBlogs();
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    const { error } = await supabase
      .from('blogs')
      .update({
        published: !blog.published,
        published_at: !blog.published ? new Date().toISOString() : null,
      })
      .eq('id', blog.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update blog',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: blog.published ? 'Blog unpublished' : 'Blog published',
      });
      fetchBlogs();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button variant="hero" onClick={() => onShowEditor(null)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 rounded-xl text-center"
        >
          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">No blogs yet</h3>
          <p className="text-muted-foreground mb-6">Create your first blog post to get started</p>
          <Button variant="hero" onClick={() => onShowEditor(null)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Post
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display font-semibold text-foreground">{blog.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      blog.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTogglePublish(blog)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShowEditor(blog)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(blog.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
