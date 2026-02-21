import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO, schemas, collectionPageSchema } from '@/components/SEO';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
  tags: string[] | null;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, published_at, created_at, category, tags')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (!error && data) {
      setBlogs(data);
      const cats = [...new Set(data.map((b) => b.category).filter(Boolean))] as string[];
      setCategories(cats);
    }
    setLoading(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((b) => b.category === selectedCategory)
    : blogs;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog - Software Development Insights"
        description="Insights, tutorials, and updates from Eglaf Technology's team of experts on software development, AI, machine learning, web development, and technology trends."
        keywords="tech blog, software development blog, AI insights, technology articles, web development tutorials"
        canonical="https://eglaftechnology.com/blog"
        schema={[
          collectionPageSchema({ name: 'Eglaf Technology Blog', description: 'Insights, tutorials, and updates on software development, AI, and technology trends.', url: 'https://eglaftechnology.com/blog' }),
          schemas.breadcrumb([{ name: 'Home', url: 'https://eglaftechnology.com/' }, { name: 'Blog', url: 'https://eglaftechnology.com/blog' }]),
        ]}
      />
      <Navbar />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground">Insights, tutorials, and updates from our team of experts</p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="text-xl text-muted-foreground">No blog posts found. Check back soon!</p>
              <Link to="/">
                <Button variant="hero" className="mt-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  {blog.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(blog.published_at || blog.created_at)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min read</span>
                    </div>
                    {blog.category && <Badge variant="secondary" className="mb-2">{blog.category}</Badge>}
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{blog.title}</h2>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{blog.excerpt}</p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                    <Link to={`/blog/${blog.slug}`}>
                      <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">Read More <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
