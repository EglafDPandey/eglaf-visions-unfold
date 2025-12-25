import { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Props interface for visibility control
interface HeroSceneProps {
  isVisible?: boolean;
}

// Reduced particle count for better performance
const PARTICLE_COUNT = 500;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00e5cc"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 2;
      orb1Ref.current.position.y = Math.cos(t * 0.4) * 1.5;
      orb1Ref.current.position.z = Math.sin(t * 0.2) * 1;
    }
    
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.4) * 2.5;
      orb2Ref.current.position.y = Math.sin(t * 0.3) * 1.2;
      orb2Ref.current.position.z = Math.cos(t * 0.25) * 1.5;
    }
    
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(t * 0.25) * 1.8;
      orb3Ref.current.position.y = Math.cos(t * 0.35) * 2;
      orb3Ref.current.position.z = Math.sin(t * 0.3) * 0.8;
    }
  });

  // Lower polygon count for spheres (16 instead of 32)
  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#00e5cc"
          emissive="#00e5cc"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}

function RotatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Reduced segments for torus (8, 50 instead of 16, 100)
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2, 0.02, 8, 50]} />
      <meshStandardMaterial
        color="#00e5cc"
        emissive="#00e5cc"
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

export function HeroScene({ isVisible = true }: HeroSceneProps) {
  const [isReady, setIsReady] = useState(false);
  
  // Defer heavy 3D initialization to not block main thread
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />;
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.3} />
        <ParticleField />
        <FloatingOrbs />
        <RotatingRing />
      </Canvas>
    </div>
  );
}

export default HeroScene;
