import { useEffect, useMemo, useRef, useState } from 'react';
import '../Styles/animatedBackground.css';

interface BackgroundSettings {
  particleCount: number;
  connectionDistance: number;
  glowIntensity: number;
  flowerSpawnRate: number;
  disableOnLowEnd: boolean;
}

const defaultSettings: BackgroundSettings = {
  particleCount: 80,
  connectionDistance: 180,
  glowIntensity: 10,
  flowerSpawnRate: 0.012,
  disableOnLowEnd: false,
};

const floralPaths = [
  new Path2D('M25 12c-3 6-9 9-15 9 6 0 12 3 15 9-3-6-3-12 0-18z'),
  new Path2D('M12 8c4 4 4 12 0 16 4-4 12-4 16 0-4-4-4-12 0-16-4 4-12 4-16 0z'),
  new Path2D('M20 5c0 6-5 11-11 11 6 0 11 5 11 11 0-6 5-11 11-11-6 0-11-5-11-11z'),
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  noise: number;
};

type FloatingFlower = {
  x: number;
  y: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  life: number;
  maxLife: number;
  path: Path2D;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function AnimatedBackground({
  settings,
  className,
}: {
  settings?: Partial<BackgroundSettings>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const [autoDisabled, setAutoDisabled] = useState(false);

  const mergedSettings = useMemo(
    () => ({
      ...defaultSettings,
      ...settings,
    }),
    [settings]
  );

  useEffect(() => {
    if (prefersReducedMotion() || autoDisabled || mergedSettings.disableOnLowEnd) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const pointer = { x: width / 2, y: height / 2, active: false };
    const particles: Particle[] = Array.from({ length: mergedSettings.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: 0.8 + Math.random() * 1.5,
      pulseSpeed: 0.002 + Math.random() * 0.003,
      noise: Math.random(),
    }));
    const flowers: FloatingFlower[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    window.addEventListener('resize', resize);

    const handlePointerMove = (event: PointerEvent | TouchEvent) => {
      let clientX: number;
      let clientY: number;

      if ('changedTouches' in event) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener('mousemove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('touchend', handlePointerLeave);

    let lastTime = 0;
    let lowFpsFrames = 0;

    const animate = (time: number) => {
      const delta = time - lastTime || 16;
      lastTime = time;

      const fps = 1000 / delta;
      if (fps < 32) {
        lowFpsFrames += 1;
        if (lowFpsFrames > 120) {
          setAutoDisabled(true);
          return;
        }
      } else {
        lowFpsFrames = Math.max(0, lowFpsFrames - 1);
      }

      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx * delta * 0.05;
        particle.y += particle.vy * delta * 0.05;

        if (particle.x < -50) particle.x = width + 50;
        if (particle.x > width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = height + 50;
        if (particle.y > height + 50) particle.y = -50;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mergedSettings.connectionDistance * 0.8) {
            const force = (1 - dist / (mergedSettings.connectionDistance * 0.8)) * 0.0007;
            particle.vx -= dx * force;
            particle.vy -= dy * force;
          }
        }

        const glow =
          mergedSettings.glowIntensity *
          (0.5 + 0.5 * Math.sin((time + index * 50) * particle.pulseSpeed));

        ctx.shadowBlur = glow;
        ctx.shadowColor = '#d4af37';
        ctx.fillStyle = `rgba(212, 175, 55, 0.6)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mergedSettings.connectionDistance) {
            const alpha = (1 - dist / mergedSettings.connectionDistance) * 0.25;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      if (Math.random() < mergedSettings.flowerSpawnRate) {
        flowers.push({
          x: Math.random() * width,
          y: height + 60,
          vy: -0.08 - Math.random() * 0.12,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.001,
          scale: 0.3 + Math.random() * 0.4,
          opacity: 0,
          life: 0,
          maxLife: height + 100,
          path: floralPaths[Math.floor(Math.random() * floralPaths.length)],
        });
      }

      for (let i = flowers.length - 1; i >= 0; i -= 1) {
        const flower = flowers[i];
        flower.y += flower.vy * delta;
        flower.rotation += flower.rotationSpeed * delta;
        flower.life += delta;

        const lifeProgress = flower.life / flower.maxLife;
        if (lifeProgress < 0.2) {
          flower.opacity = lifeProgress / 0.2;
        } else {
          flower.opacity = Math.max(0, 1 - (lifeProgress - 0.2) / 0.8);
        }

        ctx.save();
        ctx.translate(flower.x, flower.y);
        ctx.rotate(flower.rotation);
        ctx.scale(flower.scale * 26, flower.scale * 26);
        ctx.globalAlpha = flower.opacity * 0.4;
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 0.05;
        ctx.stroke(flower.path);
        ctx.restore();

        if (flower.life > flower.maxLife) {
          flowers.splice(i, 1);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handlePointerMove as EventListener);
      canvas.removeEventListener('touchmove', handlePointerMove as EventListener);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('touchend', handlePointerLeave);
    };
  }, [mergedSettings, autoDisabled]);

  if (autoDisabled) {
    return <div className={`animated-background fallback ${className ?? ''}`} aria-hidden="true" />;
  }

  return (
    <div className={`animated-background ${className ?? ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="animated-bg-canvas" />
    </div>
  );
}
