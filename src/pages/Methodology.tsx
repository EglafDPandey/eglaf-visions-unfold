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
import { isMobileWebGLDisabled } from '@/lib/device';

// 3D Animated Background Component
const AnimatedBackground = () => {
  // WebGL can crash mobile browsers (context loss -> black screen)
  if (isMobileWebGLDisabled()) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
    );
  }

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
  const webglDisabled = isMobileWebGLDisabled();

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
          {webglDisabled ? (
            <div className="h-full w-full rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center">
              <Icon className="w-10 h-10 text-primary" />
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Step3DIcon step={index} isActive={isActive} />
              </Suspense>
            </Canvas>
          )}
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

// Enhanced Step Card with Glow Effects and Expandable Details
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
  const webglDisabled = isMobileWebGLDisabled();
  
  return (
    <motion.div
      whileHover={{ scale: isActive ? 1 : 1.02, y: isActive ? 0 : -5 }}
      layout
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
        {webglDisabled ? (
          <div
            className="h-full w-full rounded-xl flex items-center justify-center border border-border/50"
            style={{ background: `${color}15` }}
          >
            <Icon className="w-10 h-10" style={{ color }} />
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color={color} />
            <Suspense fallback={null}>
              <Step3DIcon step={index} isActive={isActive} />
            </Suspense>
          </Canvas>
        )}
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

      {/* Expandable Details */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-5 pt-4 border-t border-border/50">
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
                    <span style={{ color }} className="mt-1">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Expand indicator with animation */}
      <motion.div 
        className="flex items-center justify-center mt-4 text-sm"
        style={{ color }}
        animate={{ rotate: isActive ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="mr-2">{isActive ? 'Click to collapse' : 'View Details'}</span>
        <ChevronRight className="w-4 h-4" />
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
    <span ref={ref} className="text-5xl lg:text-6xl font-bold">
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
        className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 text-center relative overflow-hidden"
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
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center relative"
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
          <Icon className="w-8 h-8 relative z-10" style={{ color }} />
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
    { id: 1, label: 'Requirements', icon: Search, x: 8, y: 50 },
    { id: 2, label: 'Wireframes', icon: Palette, x: 25, y: 30 },
    { id: 3, label: 'Designs', icon: Palette, x: 42, y: 50 },
    { id: 4, label: 'Code', icon: Code, x: 58, y: 30 },
    { id: 5, label: 'Testing', icon: TestTube, x: 75, y: 50 },
    { id: 6, label: 'Deploy', icon: Rocket, x: 92, y: 30 },
  ];

  const stepColors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffff00', '#ff6600', '#00ffff'];

  return (
    <div ref={ref} className="relative w-full py-8">
      {/* Glowing background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
      </div>

      <div className="relative flex justify-between items-center px-4 md:px-8">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const color = stepColors[index];
          
          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Connection line to next node */}
              {index < nodes.length - 1 && (
                <div className="absolute top-1/2 left-full w-full -translate-y-1/2 hidden md:block" style={{ width: 'calc(100% - 20px)' }}>
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
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}20, transparent)`,
                    borderColor: `${color}50`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color }} />
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
const TimelineCard = ({ step, index, total }: { step: typeof methodologySteps[0]; index: number; total: number }) => {
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
        className={`w-0.5 ${isTop ? 'h-8' : 'h-8'} rounded-full`}
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
  { value: 35, suffix: '+', label: 'Projects Delivered', icon: FileCheck },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Users },
  { value: 45, suffix: '%', label: 'Avg. Conversion Boost', icon: Target },
  { value: 24, suffix: '/7', label: 'Support Available', icon: HeadphonesIcon }
];

const Methodology = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        </div>
      </section>

      {/* Enhanced Scroll Indicator - Fixed position at bottom of viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 ${!showScrollIndicator ? 'pointer-events-none' : ''}`}
      >
        <motion.span 
          className="text-xs text-muted-foreground font-medium tracking-wider uppercase bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          className="relative w-8 h-14 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 overflow-hidden bg-background/80 backdrop-blur-sm"
        >
          {/* Glowing track */}
          <motion.div
            className="absolute inset-x-0 top-0 h-full opacity-30"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, transparent 100%)'
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Mouse wheel dot */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary blur-sm"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
        {/* Animated arrow */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight className="w-4 h-4 text-primary rotate-90" />
        </motion.div>
      </motion.div>

      {/* Enhanced Stats Section */}
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
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
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

      {/* Enhanced Data Flow Animation */}
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
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              Seamless Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
              Watch Your Project <span className="gradient-text">Flow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From requirements to deployment - a seamless journey with continuous data flow
            </p>
          </motion.div>
          
          <div className="glass-card p-8 rounded-2xl border border-border/50">
            <EnhancedDataFlowAnimation />
          </div>
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
        </div>
      </section>

      {/* Enhanced Timeline Overview */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              Project Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
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
                <TimelineCard key={step.step} step={step} index={index} total={methodologySteps.length} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full border border-primary/30">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                <span className="text-primary font-semibold">Total Project Duration:</span> 10-24 weeks
              </span>
              <span className="text-xs text-muted-foreground">(varies based on complexity)</span>
            </div>
          </motion.div>
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
