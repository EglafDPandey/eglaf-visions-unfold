import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
}

interface Planet {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  orbitDuration: number;
}

export const SpaceBackground = forwardRef<HTMLDivElement, object>(function SpaceBackground(_props, ref) {
  const stars = useMemo<Star[]>(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    })), []
  );

  const shootingStars = useMemo<ShootingStar[]>(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 50 + 25,
      startY: Math.random() * 30,
      delay: i * 4 + Math.random() * 2,
    })), []
  );

  const planets = useMemo<Planet[]>(() => [
    { id: 1, x: 15, y: 20, size: 60, color: 'from-primary/30 to-accent/20', orbitDuration: 20 },
    { id: 2, x: 85, y: 60, size: 40, color: 'from-secondary/30 to-primary/20', orbitDuration: 25 },
    { id: 3, x: 70, y: 15, size: 25, color: 'from-accent/40 to-secondary/20', orbitDuration: 15 },
  ], []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      {/* Nebula effects */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-[80px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[120px]"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-foreground/80"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-foreground rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeOut",
          }}
        >
          {/* Tail */}
          <motion.div
            className="absolute w-20 h-0.5 bg-gradient-to-l from-transparent to-foreground/50 -left-20 top-0"
            style={{ transformOrigin: 'right center' }}
          />
        </motion.div>
      ))}

      {/* Floating planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className={`absolute rounded-full bg-gradient-to-br ${planet.color} blur-sm`}
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: planet.size,
            height: planet.size,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: 360,
          }}
          transition={{
            y: {
              duration: planet.orbitDuration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: planet.orbitDuration / 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: planet.orbitDuration,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}

      {/* Orbital rings */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 border border-primary/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-48 h-48 border border-accent/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Particle dust */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-0.5 h-0.5 bg-foreground/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});
