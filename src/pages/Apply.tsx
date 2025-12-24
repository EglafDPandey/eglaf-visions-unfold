import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, FileText, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const applicationSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email is too long'),
  phone: z.string().trim().max(20, 'Phone number is too long').optional(),
  position: z.string().trim().min(2, 'Position is required').max(100, 'Position is too long'),
  linkedin_url: z.string().trim().url('Invalid URL').max(500, 'URL is too long').optional().or(z.literal('')),
  cover_letter: z.string().trim().max(5000, 'Cover letter is too long').optional(),
});

export default function Apply() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const statePosition = (location.state as { position?: string } | null)?.position;
  const position = statePosition ?? searchParams.get('position') ?? '';
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position,
    linkedin_url: '',
    cover_letter: '',
  });

  const lastPrefilledPositionRef = useRef(position);

  useEffect(() => {
    if (position && position !== lastPrefilledPositionRef.current) {
      setFormData((prev) => ({ ...prev, position }));
      lastPrefilledPositionRef.current = position;
    }
  }, [position]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = applicationSchema.parse(formData);
      
      let cvUrl = null;

      // Upload CV if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, selectedFile);

        if (uploadError) {
          throw new Error('Failed to upload CV: ' + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        cvUrl = publicUrl;
      }

      // Insert application into database
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          position: validatedData.position,
          linkedin_url: validatedData.linkedin_url || null,
          cv_url: cvUrl,
          cover_letter: validatedData.cover_letter || null,
        });

      if (insertError) {
        throw new Error('Failed to submit application: ' + insertError.message);
      }

      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-2xl mx-auto"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/careers')}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>

            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-4">
                Apply Now
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Submit Your <span className="gradient-text">Application</span>
              </h1>
              {position && (
                <p className="text-lg text-muted-foreground">
                  Applying for: <span className="text-foreground font-medium">{position}</span>
                </p>
              )}
            </div>

            <div className="glass-card p-8">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-semibold mb-3">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in joining Eglaf Technology.<br />
                    We'll review your application and get back to you soon.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/careers')}>
                    View More Positions
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input 
                        placeholder="John Doe" 
                        required 
                        className="bg-muted/50"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="bg-muted/50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input 
                      placeholder="+1 (555) 123-4567" 
                      className="bg-muted/50"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Position Applying For *</label>
                    <Input 
                      placeholder="Senior React Developer" 
                      required 
                      className="bg-muted/50"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
                    <Input 
                      placeholder="https://linkedin.com/in/yourprofile" 
                      className="bg-muted/50"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload CV *</label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        selectedFile ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">
                            Drag & drop your CV here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            PDF, DOC, DOCX (max 5MB)
                          </p>
                        </>
                      )}
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
                    <Textarea 
                      placeholder="Tell us why you'd be a great fit for this role..." 
                      rows={5} 
                      className="bg-muted/50"
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={loading || !selectedFile}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
