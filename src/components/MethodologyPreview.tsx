import { useState, useRef, useEffect, Suspense } from 'react';
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
  ArrowRight,
  FileCheck,
  Users,
  Target,
  Clock
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

// Full methodology steps data with details for expandable cards
const methodologyStepsDetailed = [
  { 
    step: 1, 
    title: "Discovery", 
    icon: Search, 
    timeline: "1-2 Weeks", 
    color: '#00f5ff',
    description: "Understanding your business goals and requirements",
    deliverables: ["Requirements Document", "Project Scope", "Technical Feasibility"],
    collaboration: ["Stakeholder Interviews", "Vision Alignment Session"],
    metrics: ["Clear project scope defined", "All stakeholders aligned"]
  },
  { 
    step: 2, 
    title: "Design", 
    icon: Palette, 
    timeline: "2-4 Weeks", 
    color: '#ff00ff',
    description: "Creating intuitive and engaging user experiences",
    deliverables: ["Wireframes", "UI Mockups", "Design System"],
    collaboration: ["Design Review Sessions", "Feedback Iterations"],
    metrics: ["User-centered design approved", "Brand consistency achieved"]
  },
  { 
    step: 3, 
    title: "Development", 
    icon: Code, 
    timeline: "4-12 Weeks", 
    color: '#00ff88',
    description: "Building robust and scalable solutions",
    deliverables: ["Working Application", "API Documentation", "Source Code"],
    collaboration: ["Weekly Progress Demos", "Sprint Reviews"],
    metrics: ["Feature completion rate", "Code quality standards met"]
  },
  { 
    step: 4, 
    title: "Testing", 
    icon: TestTube, 
    timeline: "2-3 Weeks", 
    color: '#ffff00',
    description: "Ensuring quality and performance",
    deliverables: ["Test Reports", "Bug Fixes", "Performance Analysis"],
    collaboration: ["UAT Sessions", "Bug Triage Meetings"],
    metrics: ["99% bug-free release", "Performance benchmarks achieved"]
  },
  { 
    step: 5, 
    title: "Deployment", 
    icon: Rocket, 
    timeline: "1-2 Weeks", 
    color: '#ff6600',
    description: "Launching your solution to the world",
    deliverables: ["Live Application", "Deployment Documentation", "Training"],
    collaboration: ["Go-live Planning", "Launch Coordination"],
    metrics: ["Zero-downtime deployment", "Successful launch"]
  },
  { 
    step: 6, 
    title: "Support", 
    icon: HeadphonesIcon, 
    timeline: "Ongoing", 
    color: '#00ffff',
    description: "Continuous improvement and maintenance",
    deliverables: ["Monthly Reports", "Updates & Patches", "Feature Enhancements"],
    collaboration: ["Regular Check-ins", "Quarterly Reviews"],
    metrics: ["99.9% uptime", "Fast response times"]
  },
];

const stats = [
  { value: 35, suffix: '+', label: 'Projects Delivered', icon: FileCheck },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Users },
  { value: 45, suffix: '%', label: 'Avg. Conversion Boost', icon: Target },
  { value: 24, suffix: '/7', label: 'Support Available', icon: HeadphonesIcon }
];

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold">
      {count}{suffix}
    </span>
  );
};

// Enhanced Stats Card Component
const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stepColors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00'];
  const color = stepColors[index % stepColors.length];
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div 
        className="glass-card p-6 lg:p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 text-center relative overflow-hidden"
        style={{
          boxShadow: `0 0 0 rgba(0,0,0,0), inset 0 0 60px ${color}05`
        }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)`
          }}
        />

        {/* Floating particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60"
            style={{ background: color }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i - 1) * 15, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            initial={{ bottom: '20%', left: `${30 + i * 20}%` }}
          />
        ))}

        {/* Icon with glow */}
        <motion.div 
          className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center relative"
          style={{ background: `${color}15` }}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${color}30, transparent)`,
              boxShadow: `0 0 20px ${color}30`
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Icon className="w-7 h-7 relative z-10" style={{ color }} />
        </motion.div>

        {/* Counter with color */}
        <div style={{ color }}>
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        </div>

        {/* Label */}
        <p className="text-muted-foreground mt-3 font-medium">{stat.label}</p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Enhanced Data Flow Animation Section
const EnhancedDataFlowAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nodes = [
    { id: 1, label: 'Requirements', icon: Search },
    { id: 2, label: 'Wireframes', icon: Palette },
    { id: 3, label: 'Designs', icon: Palette },
    { id: 4, label: 'Code', icon: Code },
    { id: 5, label: 'Testing', icon: TestTube },
    { id: 6, label: 'Deploy', icon: Rocket },
  ];

  const stepColors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];

  return (
    <div ref={ref} className="relative w-full py-8">
      {/* Glowing background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
      </div>

      <div className="relative flex justify-between items-center px-2 md:px-8">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const color = stepColors[index];
          
          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Connection line to next node */}
              {index < nodes.length - 1 && (
                <div className="absolute top-1/2 left-full -translate-y-1/2 hidden md:block" style={{ width: 'calc(100% - 20px)' }}>
                  <motion.div
                    className="h-0.5 rounded-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${stepColors[index + 1]})`
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  />
                  {/* Flowing particles */}
                  {[0, 1].map((particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute top-1/2 w-2 h-2 rounded-full -translate-y-1/2"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`
                      }}
                      initial={{ left: 0, opacity: 0 }}
                      animate={isInView ? {
                        left: ['0%', '100%'],
                        opacity: [0, 1, 1, 0]
                      } : { left: 0, opacity: 0 }}
                      transition={{
                        duration: 2,
                        delay: index * 0.15 + particleIndex * 0.8 + 0.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Node */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
                    transform: 'scale(1.5)'
                  }}
                  animate={{ scale: [1.5, 1.8, 1.5], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                
                {/* Icon container */}
                <motion.div
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}20, transparent)`,
                    borderColor: `${color}50`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.p
                className="mt-3 text-xs md:text-sm font-medium text-center"
                style={{ color }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {node.label}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced Timeline Card Component
const TimelineCard = ({ step, index }: { step: typeof methodologySteps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stepColors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];
  const color = stepColors[index];
  const Icon = step.icon;
  const isTop = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isTop ? 30 : -30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isTop ? 30 : -30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`flex flex-col items-center ${isTop ? 'flex-col' : 'flex-col-reverse'}`}
    >
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.05, y: isTop ? -5 : 5 }}
        className="glass-card p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 w-full max-w-[140px] relative overflow-hidden"
        style={{
          boxShadow: `0 0 20px ${color}10`
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% ${isTop ? '100%' : '0%'}, ${color}30, transparent 70%)`
          }}
        />

        <div className="relative z-10 text-center">
          <div 
            className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2"
            style={{ background: `${color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <p className="font-semibold text-sm">{step.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{step.timeline}</p>
        </div>
      </motion.div>

      {/* Connector line */}
      <motion.div
        className="w-0.5 h-8 rounded-full"
        style={{ background: `linear-gradient(${isTop ? '180deg' : '0deg'}, ${color}, transparent)` }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
      />

      {/* Timeline dot */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.2 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-background font-bold text-sm relative"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          {step.step}
        </div>
      </motion.div>
    </motion.div>
  );
};

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

// Enhanced Project Timeline Component
export const ProjectTimeline = ({ showCTA = true }: { showCTA?: boolean }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
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
            Project Roadmap
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Average timeline for a complete project from discovery to launch
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced Timeline Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/50 rounded-full -translate-y-1/2 hidden md:block" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 hidden md:block overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #00f5ff, #ff00ff, #00ff88, #ffff00, #ff6600, #00ffff)'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>

          {/* Flowing particles on timeline */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 hidden md:block"
              style={{
                background: 'white',
                boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff'
              }}
              initial={{ left: 0, opacity: 0 }}
              animate={{ 
                left: ['0%', '100%'],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 1.3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {methodologySteps.map((step, index) => (
              <TimelineCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full border border-primary/30">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              <span className="text-primary font-semibold">Total Project Duration:</span> 10-24 weeks
            </span>
            <span className="text-xs text-muted-foreground">(varies based on complexity)</span>
          </div>
        </motion.div>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
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

// Expandable Step Card Component
const ExpandableStepCard = ({ 
  step, 
  index, 
  isActive, 
  onClick 
}: { 
  step: typeof methodologyStepsDetailed[0]; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = step.icon;
  const color = step.color;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onClick={onClick}
    >
      <motion.div
        layout
        whileHover={{ scale: isActive ? 1 : 1.02, y: isActive ? 0 : -5 }}
        className={`glass-card p-6 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden ${
          isActive 
            ? 'border-primary shadow-[0_0_40px_rgba(0,245,255,0.4)] bg-primary/10' 
            : 'border-border/50 hover:border-primary/50'
        }`}
        style={{
          boxShadow: isActive ? `0 0 40px ${color}40` : undefined
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${color}20, transparent, ${color}20)`,
          }}
          animate={{
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Step Number Badge with pulse effect */}
        <div className="absolute -top-3 -left-3">
          <motion.div
            className="absolute inset-0 w-10 h-10 rounded-full"
            style={{ background: color }}
            animate={isActive ? {
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div 
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-background font-bold text-sm shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            {step.step}
          </div>
        </div>

        {/* 3D Icon Container */}
        <div className="h-20 w-20 mx-auto mb-4 rounded-xl overflow-hidden relative">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={color} />
            <Suspense fallback={null}>
              <Step3DIconSimple step={index} isHovered={isActive} />
            </Suspense>
          </Canvas>
          {/* Glow effect behind icon */}
          <motion.div
            className="absolute inset-0 rounded-xl -z-10"
            style={{
              background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`
            }}
            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Title & Icon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div 
            className={`p-2 rounded-lg transition-all duration-300 ${
              isActive ? 'text-background' : 'bg-muted/50 text-primary'
            }`}
            style={{ background: isActive ? color : undefined }}
            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          <h3 className="font-bold text-lg">{step.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm text-center mb-3">{step.description}</p>

        {/* Quick info pills */}
        <div className="flex justify-center gap-2 mb-2">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              background: `${color}20`, 
              color: color,
              border: `1px solid ${color}40`
            }}
          >
            {step.timeline}
          </span>
        </div>

        {/* Expandable Details */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-4 border-t border-border/50">
            {/* Timeline */}
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1 }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: `${color}20` }}
              >
                <Clock className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <span className="font-semibold text-sm text-foreground">Timeline</span>
                <p className="text-muted-foreground text-sm">{step.timeline}</p>
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: `${color}20` }}
              >
                <FileCheck className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-foreground">Deliverables</span>
                <ul className="text-muted-foreground text-sm mt-1 space-y-1">
                  {step.deliverables.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <span style={{ color }} className="mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Collaboration */}
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3 }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: `${color}20` }}
              >
                <Users className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-foreground">Client Touchpoints</span>
                <ul className="text-muted-foreground text-sm mt-1 space-y-1">
                  {step.collaboration.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <span style={{ color }} className="mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Success Metrics */}
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.4 }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: `${color}20` }}
              >
                <Target className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-foreground">Success Metrics</span>
                <ul className="text-muted-foreground text-sm mt-1 space-y-1">
                  {step.metrics.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <span style={{ color }} className="mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Click indicator */}
        <motion.div 
          className="flex items-center justify-center mt-3 text-muted-foreground text-xs"
          animate={{ opacity: isActive ? 0 : 1 }}
        >
          <span>Click to expand</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Journey to Success Preview Component (Compact version for homepage)
export const JourneyToSuccessPreviewCompact = ({ showCTA = true }: { showCTA?: boolean }) => {
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

// Journey to Success Preview Component (Expandable version for About page)
export const JourneyToSuccessPreview = ({ showCTA = true }: { showCTA?: boolean }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methodologyStepsDetailed.map((step, index) => (
            <ExpandableStepCard 
              key={step.step} 
              step={step} 
              index={index} 
              isActive={activeStep === index}
              onClick={() => handleStepClick(index)}
            />
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

// Stats Section Component
export const StatsSection = ({ showCTA = false }: { showCTA?: boolean }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            Our Impact
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real results from real projects - our track record of excellence
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Data Flow Section Component
export const DataFlowSection = ({ showCTA = false }: { showCTA?: boolean }) => {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      
      <div className="container mx-auto px-4 relative z-10">
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
            Seamless Process
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Watch Your Project <span className="gradient-text">Flow</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From requirements to deployment - a seamless journey with continuous data flow
          </p>
        </motion.div>
        
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/50">
          <EnhancedDataFlowAnimation />
        </div>
      </div>
    </section>
  );
};

export default JourneyToSuccessPreview;