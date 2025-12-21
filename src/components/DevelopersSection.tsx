import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const developers = [
  {
    role: 'React Native Developer',
    skills: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    experience: '4+ Years',
    rate: 'From $25/hr',
    color: 'from-primary to-accent',
  },
  {
    role: '.NET Developer',
    skills: ['.NET Core', 'C#', 'Azure', 'SQL Server'],
    experience: '5+ Years',
    rate: 'From $30/hr',
    color: 'from-accent to-secondary',
  },
  {
    role: 'PHP Developer',
    skills: ['Laravel', 'WordPress', 'MySQL', 'REST APIs'],
    experience: '4+ Years',
    rate: 'From $22/hr',
    color: 'from-secondary to-primary',
  },
  {
    role: 'Full Stack Developer',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    experience: '5+ Years',
    rate: 'From $35/hr',
    color: 'from-primary to-secondary',
  },
];

const hiringModels = [
  { name: 'Full-Time', description: 'Dedicated developers for long-term projects', icon: '⏰' },
  { name: 'Part-Time', description: 'Flexible engagement for ongoing needs', icon: '📊' },
  { name: 'Hourly', description: 'Pay only for the hours you need', icon: '💡' },
];

function DeveloperCard({ developer, index }: { developer: typeof developers[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-card-hover p-6 md:p-8"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${developer.color} flex items-center justify-center mb-6`}>
        <span className="text-2xl font-display font-bold text-primary-foreground">
          {developer.role.charAt(0)}
        </span>
      </div>

      <h3 className="text-xl font-display font-bold text-foreground mb-2">
        {developer.role}
      </h3>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-primary font-medium">{developer.experience}</span>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{developer.rate}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {developer.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <Button variant="neon" className="w-full">
        Hire Now
      </Button>
    </motion.div>
  );
}

export function DevelopersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="developers" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6"
          >
            Dedicated Developers
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Hire Expert{' '}
            <span className="gradient-text">Developers</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Scale your team with our skilled developers. Flexible hiring models 
            to match your project needs and budget.
          </motion.p>
        </div>

        {/* Hiring Models */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {hiringModels.map((model, index) => (
            <div
              key={model.name}
              className="glass-card p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-4">{model.icon}</div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                {model.name}
              </h4>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Developer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((developer, index) => (
            <DeveloperCard key={developer.role} developer={developer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DevelopersSection;
