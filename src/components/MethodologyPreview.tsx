import { useState, useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  Search, 
  Palette, 
  Code, 
  TestTube, 
  Rocket, 
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Simplified 3D Icon for preview
const Step3DIconSimple = ({ step, isHovered }: { step: number; isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const colors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];

  return (
    <mesh ref={meshRef} scale={isHovered ? 1.2 : 1}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={colors[step]}
        metalness={0.8}
        roughness={0.2}
        emissive={colors[step]}
        emissiveIntensity={isHovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

const methodologySteps = [
  { step: 1, title: "Discovery", icon: Search, timeline: "1-2 Weeks", color: '#00f5ff' },
  { step: 2, title: "Design", icon: Palette, timeline: "2-4 Weeks", color: '#ff00ff' },
  { step: 3, title: "Development", icon: Code, timeline: "4-12 Weeks", color: '#00ff88' },
  { step: 4, title: "Testing", icon: TestTube, timeline: "2-3 Weeks", color: '#ffff00' },
  { step: 5, title: "Deployment", icon: Rocket, timeline: "1-2 Weeks", color: '#ff6600' },
  { step: 6, title: "Support", icon: HeadphonesIcon, timeline: "Ongoing", color: '#00ffff' },
];

// Compact Step Card for preview
const CompactStepCard = ({ step, index }: { step: typeof methodologySteps[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full"
        style={{
          boxShadow: isHovered ? `0 0 30px ${step.color}30` : undefined
        }}
      >
        {/* Step Number */}
        <div 
          className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-background font-bold text-sm shadow-lg"
          style={{ background: step.color }}
        >
          {step.step}
        </div>

        {/* 3D Icon */}
        <div className="h-16 w-16 mx-auto mb-4 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={step.color} />
            <Suspense fallback={null}>
              <Step3DIconSimple step={index} isHovered={isHovered} />
            </Suspense>
          </Canvas>
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon className="w-4 h-4" style={{ color: step.color }} />
            <h3 className="font-bold">{step.title}</h3>
          </div>
          <span 
            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ 
              background: `${step.color}20`, 
              color: step.color,
            }}
          >
            {step.timeline}
          </span>
        </div>
      </motion.div>

      {/* Connection line */}
      {index < 5 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px">
          <motion.div
            className="h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${step.color}, ${methodologySteps[index + 1].color})`
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          />
          {/* Flowing particle */}
          <motion.div
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full -translate-y-1/2"
            style={{
              background: step.color,
              boxShadow: `0 0 8px ${step.color}`
            }}
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

// Project Timeline Component
export const ProjectTimeline = ({ showCTA = true }: { showCTA?: boolean }) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Average timeline for a complete project from discovery to launch
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted rounded-full -translate-y-1/2" />
          <motion.div 
            className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full -translate-y-1/2"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="grid grid-cols-6 relative">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-background font-bold text-sm mb-4 relative z-10 ${
                    index % 2 === 0 ? 'mt-16' : 'mt-0'
                  }`}
                  style={{ background: step.color }}
                  whileHover={{ scale: 1.2 }}
                >
                  {step.step}
                </motion.div>
                <div className={`text-center ${index % 2 === 0 ? 'order-first' : 'order-last'}`}>
                  <p className="font-semibold text-sm">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.timeline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-muted-foreground"
        >
          <span className="text-primary font-semibold">Total Project Duration:</span> 10-24 weeks (varies based on complexity)
        </motion.p>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" className="group">
              <Link to="/methodology">
                View Full Methodology
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Journey to Success Preview Component
export const JourneyToSuccessPreview = ({ showCTA = true }: { showCTA?: boolean }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4"
          >
            Our Process
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The <span className="gradient-text">Journey</span> to Success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven 6-step methodology that transforms your vision into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {methodologySteps.map((step, index) => (
            <CompactStepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild className="group">
              <Link to="/methodology">
                Explore Full Methodology
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JourneyToSuccessPreview;
