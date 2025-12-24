import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const positions = [
  { title: 'Senior React Developer', location: 'Remote', type: 'Full-time', department: 'Engineering' },
  { title: 'AI/ML Engineer', location: 'Remote', type: 'Full-time', department: 'AI Division' },
  { title: 'Mobile Developer (Flutter)', location: 'Remote', type: 'Full-time', department: 'Mobile' },
  { title: 'UX/UI Designer', location: 'Remote', type: 'Full-time', department: 'Design' },
  { title: 'DevOps Engineer', location: 'Remote', type: 'Full-time', department: 'Infrastructure' },
  { title: 'Project Manager', location: 'Remote', type: 'Full-time', department: 'Management' },
];

export default function Careers() {
  const navigate = useNavigate();

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
          <div className="max-w-4xl mx-auto">
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
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/apply?position=${encodeURIComponent(pos.title)}`)}
                  >
                    Apply Now
                  </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
