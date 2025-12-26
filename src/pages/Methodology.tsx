import { useState, useRef, useMemo, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
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

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useState(() => {
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
  });

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

      {/* Process Steps Section */}
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
              Click on each step to explore timelines, deliverables, collaboration touchpoints, and success metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {methodologySteps.map((step, index) => (
              <ProcessStep
                key={step.step}
                {...step}
                index={index}
                isActive={activeStep === index}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              />
            ))}
          </div>
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
