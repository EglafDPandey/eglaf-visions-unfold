import { motion } from 'framer-motion';
import { Linkedin, Facebook } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

import dhirendraImg from '@/assets/team/dhirendra-pandey.png';
import mudassarImg from '@/assets/team/mudassar-basit.png';
import rajeshImg from '@/assets/team/rajesh-gurjar.png';
import praveenImg from '@/assets/team/praveen-upadhyay.png';
import bittuImg from '@/assets/team/bittu-shukla.png';
import vivekImg from '@/assets/team/vivek-jha.png';
import rahulImg from '@/assets/team/rahul-shukla.png';

const LINKEDIN_URL = 'https://in.linkedin.com/company/eglaftech';
const FACEBOOK_URL = 'https://www.facebook.com/EGLAFTECH';

const team = [
  { name: 'Dhirendra Pandey', role: 'CEO & Founder', image: dhirendraImg },
  { name: 'Mudassar Basit', role: 'CTO', image: mudassarImg },
  { name: 'Rajesh Gurjar', role: 'Lead Developer', image: rajeshImg },
  { name: 'Praveen Upadhyay', role: 'AI Lead', image: praveenImg },
  { name: 'Bittu Shukla', role: 'Project Manager', image: bittuImg },
  { name: 'Vivek Jha', role: 'Dev Engineer', image: vivekImg },
  { name: 'Rahul Shukla', role: 'Digital Market Expert', image: rahulImg },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Team"
        description="Meet the talented team of professionals at Eglaf Technology dedicated to delivering exceptional results in software development and AI solutions."
        keywords="team, experts, developers, designers, engineers"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">Our Team</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Meet Our <span className="gradient-text">Experts</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A talented team of professionals dedicated to delivering exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="group glass-card overflow-hidden">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-4">{member.role}</p>
                  <div className="flex gap-3">
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
