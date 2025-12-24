import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, FileText, DollarSign, Briefcase, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import BlogEditor from '@/components/admin/BlogEditor';
import AdminBlogs from '@/components/admin/AdminBlogs';
import AdminQuoteRequests from '@/components/admin/AdminQuoteRequests';
import AdminJobApplications from '@/components/admin/AdminJobApplications';
import AdminContacts from '@/components/admin/AdminContacts';

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

export default function AdminDashboard() {
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleShowEditor = (blog: Blog | null) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showEditor) {
    return (
      <BlogEditor
        blog={editingBlog}
        onClose={() => {
          setShowEditor(false);
          setEditingBlog(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">E</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blogs</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Quotes</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <AdminBlogs onShowEditor={handleShowEditor} />
          </TabsContent>

          <TabsContent value="quotes">
            <AdminQuoteRequests />
          </TabsContent>

          <TabsContent value="applications">
            <AdminJobApplications />
          </TabsContent>

          <TabsContent value="contacts">
            <AdminContacts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
