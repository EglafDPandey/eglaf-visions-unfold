import { motion } from 'framer-motion';
import { useState } from 'react';
import { Briefcase, MapPin, Clock, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

const positions = [
  { title: 'Senior React Developer', location: 'Remote', type: 'Full-time', department: 'Engineering' },
  { title: 'AI/ML Engineer', location: 'Remote', type: 'Full-time', department: 'AI Division' },
  { title: 'Mobile Developer (Flutter)', location: 'Remote', type: 'Full-time', department: 'Mobile' },
  { title: 'UX/UI Designer', location: 'Remote', type: 'Full-time', department: 'Design' },
  { title: 'DevOps Engineer', location: 'Remote', type: 'Full-time', department: 'Infrastructure' },
  { title: 'Project Manager', location: 'Remote', type: 'Full-time', department: 'Management' },
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">Careers</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Build the future of technology with us. We're always looking for talented individuals.
            </p>
          </motion.div>

          {/* Open Positions */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-display font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((pos, i) => (
                <motion.div key={pos.title} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 flex flex-wrap items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{pos.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{pos.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{pos.type}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{pos.department}</span>
                    </div>
                  </div>
                  <Button variant="outline">Apply Now</Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                <Upload className="w-6 h-6 inline mr-2" />
                Drop Your CV
              </h2>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground">We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" required className="bg-muted/50" />
                    <Input type="email" placeholder="Email Address" required className="bg-muted/50" />
                  </div>
                  <Input placeholder="Phone Number" className="bg-muted/50" />
                  <Input placeholder="Position Applying For" required className="bg-muted/50" />
                  <Input placeholder="LinkedIn Profile URL" className="bg-muted/50" />
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Drag & drop your CV here or click to browse</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  </div>
                  <Textarea placeholder="Cover Letter (Optional)" rows={4} className="bg-muted/50" />
                  <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
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
