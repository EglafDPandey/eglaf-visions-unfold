import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Lightbulb, Users, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const milestones = [
  { year: '2014', title: 'Company Founded', description: 'Started with a vision to transform digital landscapes' },
  { year: '2016', title: 'First Major Client', description: 'Partnered with Fortune 500 company' },
  { year: '2018', title: 'Global Expansion', description: 'Opened offices in 3 new countries' },
  { year: '2020', title: 'AI Division Launch', description: 'Launched dedicated AI solutions team' },
  { year: '2022', title: '500+ Projects', description: 'Milestone of 500 successful projects' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as top tech solutions provider' },
];

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '200+', label: 'Happy Clients' },
  { value: '50+', label: 'Team Members' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              We Are <span className="gradient-text">Eglaf Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A forward-thinking technology company transforming businesses through innovative digital solutions since 2014.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Target, title: 'Mission', desc: 'Empower businesses with innovative technology solutions' },
              { icon: Eye, title: 'Vision', desc: 'Be the leading technology partner globally' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Push boundaries with cutting-edge solutions' },
              { icon: Users, title: 'Partnership', desc: 'Build lasting relationships with clients' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Our <span className="gradient-text">Journey</span></h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`flex items-center gap-8 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="glass-card p-6 inline-block">
                      <div className="text-primary font-bold mb-1">{m.year}</div>
                      <div className="font-display font-semibold mb-1">{m.title}</div>
                      <div className="text-sm text-muted-foreground">{m.description}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary relative z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
