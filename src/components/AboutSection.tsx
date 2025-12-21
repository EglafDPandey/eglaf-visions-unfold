import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Lightbulb, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'To empower businesses with innovative technology solutions that drive growth and digital transformation.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'To be the leading technology partner for enterprises seeking cutting-edge digital solutions globally.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries, embracing new technologies and methodologies to deliver exceptional results.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We believe in building lasting relationships, working closely with clients as true partners in their success.',
  },
];

const techStack = [
  'React', 'React Native', 'Node.js', '.NET', 'PHP', 'Python',
  'TypeScript', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'Firebase',
  'Docker', 'Kubernetes', 'TensorFlow', 'OpenAI',
];

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
            >
              We Are{' '}
              <span className="gradient-text">Eglaf Technology</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Eglaf Technology LLP is a forward-thinking technology company 
              specializing in mobile applications, web development, AI solutions, 
              and enterprise software. With a passion for innovation and excellence, 
              we transform complex business challenges into elegant digital solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed"
            >
              Our team of expert developers, designers, and strategists work 
              collaboratively to deliver solutions that not only meet but exceed 
              expectations, helping businesses thrive in the digital age.
            </motion.p>
          </div>

          {/* Right - Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl font-display font-semibold text-foreground mb-8">
            Our Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 rounded-full glass-card text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
