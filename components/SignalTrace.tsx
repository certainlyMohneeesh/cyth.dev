"use client";

import { useEffect, useRef, useCallback } from "react";

/*
 * SignalTrace — cursor-reactive geometric particle system
 *
 * Creates a subtle atmospheric layer where mouse movement spawns tiny
 * diamond-shaped particles that drift downward and briefly connect
 * nearby neighbours with thin lines, like disturbing dust in dark glass.
 *
 * Performance: ~120 particles max, requestAnimationFrame loop,
 * respects prefers-reduced-motion. Canvas is pointer-events: none.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
}

/* ── Tuning constants ────────────────────────────────────── */
const MAX_PARTICLES = 120;
const SPAWN_THROTTLE_MS = 28;
const PARTICLE_MAX_AGE_MIN = 2200; // ms
const PARTICLE_MAX_AGE_MAX = 3800;
const PARTICLE_SIZE_MIN = 1.8;
const PARTICLE_SIZE_MAX = 3.6;
const DRIFT_SPEED = 0.12; // px per frame downward
const JITTER = 0.08;
const CONNECTION_DISTANCE = 80; // px
const CONNECTION_OPACITY = 0.12;

/* ── Accent colour in RGB for canvas drawing ─────────────── */
// oklch(0.75 0.15 220) ≈ rgb(65, 200, 225)  — Electric Cyan
const ACCENT_R = 65;
const ACCENT_G = 200;
const ACCENT_B = 225;

// Warm amber for the fade-out phase: rgb(184, 150, 90)
const AMBER_R = 184;
const AMBER_G = 150;
const AMBER_B = 90;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function SignalTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  /* ── Draw a diamond shape ────────────────────────────────── */
  const drawDiamond = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y - size);       // top
      ctx.lineTo(x + size, y);       // right
      ctx.lineTo(x, y + size);       // bottom
      ctx.lineTo(x - size, y);       // left
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  /* ── Animation loop ──────────────────────────────────────── */
  const animate = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += 16; // ~60fps frame budget

        if (p.age >= p.maxAge) {
          particles.splice(i, 1);
          continue;
        }

        // Drift: slight downward + random jitter
        p.x += p.vx + (Math.random() - 0.5) * JITTER;
        p.y += p.vy + DRIFT_SPEED + (Math.random() - 0.5) * JITTER * 0.5;
        p.vx *= 0.98; // damping
        p.vy *= 0.98;
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const life1 = 1 - particles[i].age / particles[i].maxAge;
            const life2 = 1 - particles[j].age / particles[j].maxAge;
            const opacity = CONNECTION_OPACITY * (1 - dist / CONNECTION_DISTANCE) * Math.min(life1, life2);

            ctx.strokeStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${opacity})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath();
            ctx.moveTo(particles[i].x * dpr, particles[i].y * dpr);
            ctx.lineTo(particles[j].x * dpr, particles[j].y * dpr);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const life = 1 - p.age / p.maxAge;

        // Color transition: cyan → amber → transparent
        const fadePhase = Math.min(p.age / p.maxAge, 1);
        const r = Math.round(lerp(ACCENT_R, AMBER_R, fadePhase));
        const g = Math.round(lerp(ACCENT_G, AMBER_G, fadePhase));
        const b = Math.round(lerp(ACCENT_B, AMBER_B, fadePhase));

        // Opacity: peaks at 15% life then fades
        const opacityCurve = life < 0.85 ? life / 0.85 : 1;
        const opacity = opacityCurve * life * 0.65;

        const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        drawDiamond(ctx, p.x * dpr, p.y * dpr, p.size * dpr, color);
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [drawDiamond]
  );

  useEffect(() => {
    // Check reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMqChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onMqChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to viewport
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking — spawns particles
    const onMouseMove = (e: MouseEvent) => {
      if (reducedMotionRef.current) return;

      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = performance.now();

      if (now - lastSpawnRef.current > SPAWN_THROTTLE_MS) {
        lastSpawnRef.current = now;
        const particles = particlesRef.current;

        if (particles.length < MAX_PARTICLES) {
          particles.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.15,
            age: 0,
            maxAge:
              PARTICLE_MAX_AGE_MIN +
              Math.random() * (PARTICLE_MAX_AGE_MAX - PARTICLE_MAX_AGE_MIN),
            size:
              PARTICLE_SIZE_MIN +
              Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN),
          });
        }
      }
    };

    // Touch tracking — spawns particles on touch move
    const onTouchMove = (e: TouchEvent) => {
      if (reducedMotionRef.current) return;

      const touch = e.touches[0];
      if (!touch) return;

      const now = performance.now();
      // Reduced density on touch — every 60ms instead of 28ms
      if (now - lastSpawnRef.current > SPAWN_THROTTLE_MS * 2.2) {
        lastSpawnRef.current = now;
        const particles = particlesRef.current;

        if (particles.length < MAX_PARTICLES * 0.6) {
          particles.push({
            x: touch.clientX,
            y: touch.clientY,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.1,
            age: 0,
            maxAge:
              PARTICLE_MAX_AGE_MIN +
              Math.random() * (PARTICLE_MAX_AGE_MAX - PARTICLE_MAX_AGE_MIN),
            size:
              PARTICLE_SIZE_MIN +
              Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN),
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      mq.removeEventListener("change", onMqChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
