import { useState, useRef, useMemo, Suspense, useEffect } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Palette, 
  Code, 
  TestTube, 
  Rocket, 
  HeadphonesIcon,
  Clock,
  FileCheck,
  Users,
  Target,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
};

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-4, 2, -5]}>
          <MeshDistortMaterial
            color="#00f5ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Torus args={[1.5, 0.3, 16, 100]} position={[4, -2, -6]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color="#ff00ff"
            transparent
            opacity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
        <Box args={[1.5, 1.5, 1.5]} position={[0, 3, -8]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#00ff88"
            transparent
            opacity={0.4}
            metalness={0.7}
            roughness={0.2}
            wireframe
          />
        </Box>
      </Float>
    </group>
  );
};

// 3D Step Icon Component
const Step3DIcon = ({ step, isActive }: { step: number; isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const shapes = useMemo(() => [
    <icosahedronGeometry args={[1, 1]} />,
    <octahedronGeometry args={[1, 0]} />,
    <dodecahedronGeometry args={[1, 0]} />,
    <tetrahedronGeometry args={[1, 0]} />,
    <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />,
    <capsuleGeometry args={[0.5, 1, 8, 16]} />,
  ], []);

  const colors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];

  return (
    <mesh ref={meshRef} scale={isActive ? 1.2 : 1}>
      {shapes[step]}
      <meshStandardMaterial
        color={colors[step]}
        metalness={0.8}
        roughness={0.2}
        emissive={colors[step]}
        emissiveIntensity={isActive ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Process Step Card Component
const ProcessStep = ({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  timeline, 
  deliverables, 
  collaboration, 
  metrics,
  index,
  isActive,
  onClick
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  timeline: string;
  deliverables: string[];
  collaboration: string[];
  metrics: string[];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative cursor-pointer group ${isActive ? 'z-10' : 'z-0'}`}
      onClick={onClick}
    >
      {/* Connection Line */}
      {index < 5 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
      )}
      
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className={`glass-card p-6 lg:p-8 rounded-2xl border transition-all duration-500 ${
          isActive 
            ? 'border-primary shadow-[0_0_30px_rgba(0,245,255,0.3)] bg-primary/10' 
            : 'border-border/50 hover:border-primary/50'
        }`}
      >
        {/* Step Number Badge */}
        <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
          {step}
        </div>

        {/* 3D Icon Container */}
        <div className="h-24 w-24 mx-auto mb-6 rounded-xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Step3DIcon step={index} isActive={isActive} />
            </Suspense>
          </Canvas>
        </div>

        {/* Title & Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl transition-all duration-300 ${
            isActive ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-primary'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <p className="text-muted-foreground mb-6">{description}</p>

        {/* Expandable Details */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-4 border-t border-border/50">
            {/* Timeline */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-sm text-foreground">Timeline:</span>
                <p className="text-muted-foreground text-sm">{timeline}</p>
              </div>
            </div>

            {/* Deliverables */}
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-sm text-foreground">Deliverables:</span>
                <ul className="text-muted-foreground text-sm list-disc list-inside">
                  {deliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collaboration */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-sm text-foreground">Client Touchpoints:</span>
                <ul className="text-muted-foreground text-sm list-disc list-inside">
                  {collaboration.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Success Metrics */}
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-sm text-foreground">Success Metrics:</span>
                <ul className="text-muted-foreground text-sm list-disc list-inside">
                  {metrics.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expand Indicator */}
        <motion.div 
          className="flex items-center justify-center mt-4 text-primary"
          animate={{ rotate: isActive ? 90 : 0 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Flowing Particles Component
const FlowingParticle = ({ delay, duration, pathId }: { delay: number; duration: number; pathId: string }) => {
  return (
    <motion.circle
      r="4"
      fill="url(#particleGradient)"
      filter="url(#glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        offsetPath: `path("${pathId}")`,
        offsetRotate: "0deg"
      }}
    />
  );
};

// Process Flow Visualization Component
const ProcessFlowVisualization = ({ activeStep, onStepClick }: { activeStep: number | null; onStepClick: (index: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const stepColors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];

  // Generate curved path between nodes
  const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2;
    const controlOffset = Math.abs(endY - startY) * 0.5;
    return `M ${startX} ${startY} Q ${midX} ${startY - controlOffset} ${endX} ${endY}`;
  };

  return (
    <div ref={containerRef} className="relative w-full py-20">
      {/* SVG Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Step Nodes with Animated Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
        {methodologySteps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative"
          >
            {/* Animated Connection Line to Next Step */}
            {index < 5 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px">
                {/* Glowing line */}
                <motion.div
                  className="absolute inset-0 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${stepColors[index]}, ${stepColors[index + 1]})`
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                />
                {/* Flowing particles on line */}
                {[0, 1, 2].map((particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute top-1/2 w-2 h-2 rounded-full -translate-y-1/2"
                    style={{
                      background: stepColors[index],
                      boxShadow: `0 0 10px ${stepColors[index]}, 0 0 20px ${stepColors[index]}`
                    }}
                    initial={{ left: 0, opacity: 0 }}
                    animate={isInView ? {
                      left: ['0%', '100%'],
                      opacity: [0, 1, 1, 0]
                    } : { left: 0, opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: index * 0.15 + particleIndex * 0.6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            )}

            {/* Row connector for mobile/tablet */}
            {index < 5 && index % 3 !== 2 && (
              <div className="hidden md:block lg:hidden absolute top-1/2 -right-4 w-8 h-px">
                <motion.div
                  className="absolute inset-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                />
              </div>
            )}

            {/* Vertical connector between rows */}
            {index === 2 && (
              <div className="hidden lg:block absolute -bottom-12 left-1/2 w-px h-12 -translate-x-1/2">
                <motion.div
                  className="absolute inset-0 w-0.5 rounded-full bg-gradient-to-b from-primary to-accent"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
                {[0, 1].map((particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute left-1/2 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{
                      background: stepColors[2],
                      boxShadow: `0 0 10px ${stepColors[2]}, 0 0 20px ${stepColors[2]}`
                    }}
                    initial={{ top: 0, opacity: 0 }}
                    animate={isInView ? {
                      top: ['0%', '100%'],
                      opacity: [0, 1, 1, 0]
                    } : { top: 0, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.6 + particleIndex * 0.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            )}

            {/* The actual step card */}
            <div onClick={() => onStepClick(index)}>
              <StepCard
                step={step}
                index={index}
                isActive={activeStep === index}
                color={stepColors[index]}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Step Card with Glow Effects
const StepCard = ({ 
  step, 
  index, 
  isActive, 
  color 
}: { 
  step: typeof methodologySteps[0]; 
  index: number; 
  isActive: boolean;
  color: string;
}) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative glass-card p-6 lg:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
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

      {/* Orbiting particles around active card */}
      {isActive && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: Infinity,
                ease: "linear"
              }}
              initial={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%'
              }}
            >
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ background: color }}
                animate={{
                  x: [0, 150, 0, -150, 0],
                  y: [-150, 0, 150, 0, -150]
                }}
                transition={{
                  duration: 4,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {/* Step Number Badge with pulse effect */}
      <div className="absolute -top-4 -left-4">
        <motion.div
          className="absolute inset-0 w-12 h-12 rounded-full"
          style={{ background: color }}
          animate={isActive ? {
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div 
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-background font-bold text-lg shadow-lg"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          {step.step}
        </div>
      </div>

      {/* 3D Icon Container */}
      <div className="h-24 w-24 mx-auto mb-6 rounded-xl overflow-hidden relative">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color={color} />
          <Suspense fallback={null}>
            <Step3DIcon step={index} isActive={isActive} />
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
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className={`p-3 rounded-xl transition-all duration-300 ${
            isActive ? 'text-background' : 'bg-muted/50 text-primary'
          }`}
          style={{ background: isActive ? color : undefined }}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        <h3 className="text-xl font-bold">{step.title}</h3>
      </div>

      <p className="text-muted-foreground mb-4">{step.description}</p>

      {/* Quick info pills */}
      <div className="flex flex-wrap gap-2 mb-4">
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
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground"
        >
          {step.deliverables.length} Deliverables
        </span>
      </div>

      {/* Expand indicator with animation */}
      <motion.div 
        className="flex items-center justify-center text-sm"
        style={{ color }}
      >
        <span className="mr-2">View Details</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Data Flow Animation Section
const DataFlowAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nodes = [
    { id: 1, label: 'Requirements', x: 10, y: 50 },
    { id: 2, label: 'Wireframes', x: 25, y: 30 },
    { id: 3, label: 'Designs', x: 40, y: 50 },
    { id: 4, label: 'Code', x: 55, y: 30 },
    { id: 5, label: 'Testing', x: 70, y: 50 },
    { id: 6, label: 'Deploy', x: 85, y: 30 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return (
    <div ref={ref} className="relative h-40 w-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="50%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <filter id="flowGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map((conn, index) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const midX = (from.x + to.x) / 2;
          const path = `M ${from.x}% ${from.y}% Q ${midX}% ${(from.y + to.y) / 2 - 15}% ${to.x}% ${to.y}%`;
          
          return (
            <g key={index}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#flowGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
              {/* Flowing particle */}
              <motion.circle
                r="5"
                fill="#ffffff"
                filter="url(#flowGlow)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: index * 0.3 + 1,
                  repeat: Infinity,
                }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${index * 0.3 + 1}s`}
                  path={path}
                />
              </motion.circle>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="20"
              fill="hsl(var(--background))"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              filter="url(#flowGlow)"
            />
            <text
              x={`${node.x}%`}
              y={`${node.y + 12}%`}
              textAnchor="middle"
              className="fill-foreground text-xs font-medium"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

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
    <span ref={ref} className="text-4xl lg:text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
};

const methodologySteps = [
  {
    step: 1,
    title: "Discovery",
    icon: Search,
    description: "We dive deep into understanding your business, goals, target audience, and competitive landscape to build a solid foundation.",
    timeline: "1-2 Weeks",
    deliverables: [
      "Project brief & scope document",
      "User persona profiles",
      "Competitor analysis report",
      "Technical requirements specification"
    ],
    collaboration: [
      "Kickoff meeting & stakeholder interviews",
      "Weekly discovery sessions",
      "Requirements validation workshop"
    ],
    metrics: [
      "100% stakeholder alignment",
      "Clear success criteria defined",
      "Risk assessment completed"
    ]
  },
  {
    step: 2,
    title: "Design",
    icon: Palette,
    description: "Transform insights into stunning visual designs with intuitive user experiences that captivate and convert.",
    timeline: "2-4 Weeks",
    deliverables: [
      "Wireframes & user flows",
      "High-fidelity UI mockups",
      "Interactive prototype",
      "Design system & style guide"
    ],
    collaboration: [
      "Design review sessions (2x weekly)",
      "Feedback incorporation rounds",
      "Final design approval meeting"
    ],
    metrics: [
      "User testing satisfaction > 85%",
      "Design-to-development handoff complete",
      "Brand consistency score > 95%"
    ]
  },
  {
    step: 3,
    title: "Development",
    icon: Code,
    description: "Our expert developers bring designs to life with clean, scalable code using cutting-edge technologies.",
    timeline: "4-12 Weeks",
    deliverables: [
      "Functional frontend & backend",
      "API integrations",
      "Database architecture",
      "Code documentation"
    ],
    collaboration: [
      "Sprint demos every 2 weeks",
      "Progress dashboard access",
      "Direct Slack/Teams communication"
    ],
    metrics: [
      "Code coverage > 80%",
      "Performance benchmarks met",
      "Zero critical bugs in sprint"
    ]
  },
  {
    step: 4,
    title: "Testing",
    icon: TestTube,
    description: "Rigorous quality assurance ensures your product is bug-free, secure, and performs flawlessly across all platforms.",
    timeline: "2-3 Weeks",
    deliverables: [
      "Test cases & automation scripts",
      "Security audit report",
      "Performance test results",
      "UAT sign-off document"
    ],
    collaboration: [
      "Bug triage meetings",
      "UAT environment access",
      "Final acceptance testing"
    ],
    metrics: [
      "99.9% uptime in staging",
      "Page load < 3 seconds",
      "Zero security vulnerabilities"
    ]
  },
  {
    step: 5,
    title: "Deployment",
    icon: Rocket,
    description: "Seamless launch with zero downtime, complete with monitoring setup and go-live support.",
    timeline: "1-2 Weeks",
    deliverables: [
      "Production deployment",
      "CI/CD pipeline setup",
      "Monitoring & alerting",
      "Rollback procedures"
    ],
    collaboration: [
      "Go-live planning meeting",
      "Launch day war room",
      "Post-launch review"
    ],
    metrics: [
      "Zero downtime deployment",
      "All systems operational",
      "Stakeholder sign-off obtained"
    ]
  },
  {
    step: 6,
    title: "Support",
    icon: HeadphonesIcon,
    description: "Ongoing maintenance, updates, and optimization to ensure your product continues to evolve and succeed.",
    timeline: "Ongoing",
    deliverables: [
      "Monthly maintenance reports",
      "Security patches & updates",
      "Performance optimization",
      "Feature enhancements"
    ],
    collaboration: [
      "Monthly review calls",
      "24/7 critical support",
      "Quarterly roadmap planning"
    ],
    metrics: [
      "< 4hr response time",
      "99.9% uptime SLA",
      "Client satisfaction > 95%"
    ]
  }
];

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 45, suffix: '%', label: 'Avg. Conversion Boost' },
  { value: 24, suffix: '/7', label: 'Support Available' }
];

const Methodology = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO 
        title="Our Methodology | Eglaf Technology"
        description="Discover our transparent 6-step development methodology: Discovery, Design, Development, Testing, Deployment, and Support. We ensure successful project delivery with clear timelines and deliverables."
        keywords="development methodology, software development process, agile development, project management, digital transformation"
        canonical="https://eglaftechnology.com/methodology"
      />
      
      <Navbar />

      {/* Hero Section with 3D Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                Transparent Process
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Our{' '}
              <span className="gradient-text">Methodology</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A proven 6-step approach that transforms your vision into reality 
              with complete transparency, clear milestones, and measurable success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link to="/quote-request">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flow Animation */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Watch Your Project <span className="gradient-text">Flow</span>
            </h2>
            <p className="text-muted-foreground">
              From requirements to deployment - a seamless journey
            </p>
          </motion.div>
          <DataFlowAnimation />
        </div>
      </section>

      {/* Process Steps Section with Flow Visualization */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The <span className="gradient-text">Journey</span> to Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hover over each step to see the data flow. Click to explore timelines, deliverables, and success metrics.
            </p>
          </motion.div>

          <ProcessFlowVisualization 
            activeStep={activeStep} 
            onStepClick={(index) => setActiveStep(activeStep === index ? null : index)} 
          />

          {/* Detailed Step Modal/Drawer */}
          {activeStep !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 glass-card p-8 rounded-2xl border border-primary/30 max-w-4xl mx-auto"
              style={{
                boxShadow: `0 0 60px ${['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'][activeStep]}20`
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'][activeStep] 
                    }}
                  >
                    {(() => {
                      const Icon = methodologySteps[activeStep].icon;
                      return <Icon className="w-6 h-6 text-background" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{methodologySteps[activeStep].title}</h3>
                    <p className="text-muted-foreground">{methodologySteps[activeStep].timeline}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Close
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Deliverables */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <FileCheck className="w-5 h-5" />
                    <span className="font-semibold">Deliverables</span>
                  </div>
                  <ul className="space-y-2">
                    {methodologySteps[activeStep].deliverables.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Collaboration */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Client Touchpoints</span>
                  </div>
                  <ul className="space-y-2">
                    {methodologySteps[activeStep].collaboration.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Success Metrics</span>
                  </div>
                  <ul className="space-y-2">
                    {methodologySteps[activeStep].metrics.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">✓</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
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
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm mb-4 relative z-10 ${
                    index % 2 === 0 ? 'mt-16' : 'mt-0'
                  }`}>
                    {step.step}
                  </div>
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
            transition={{ delay: 1.5 }}
            className="text-center mt-16 text-muted-foreground"
          >
            <span className="text-primary font-semibold">Total Project Duration:</span> 10-24 weeks (varies based on complexity)
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and see how our methodology can help 
              bring your vision to life with predictable results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/quote-request">
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Methodology;
