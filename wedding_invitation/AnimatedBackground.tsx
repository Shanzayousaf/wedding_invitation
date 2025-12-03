'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface FloatingFlower {
  x: number
  y: number
  vy: number
  rotation: number
  rotationSpeed: number
  opacity: number
  scale: number
  type: number
}

// Configuration - tweak these values as needed
const CONFIG = {
  particleCount: 60,
  connectionDistance: 120,
  flowerSpawnRate: 0.008,
  glowIntensity: 0.6,
  maxFlowers: 8,
  enableRadialGlow: true,
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const flowersRef = useRef<FloatingFlower[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const isLowEndRef = useRef(false)

  // Detect low-end device
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    if (!gl) {
      isLowEndRef.current = true
    } else {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        if (renderer.includes('Mali') || renderer.includes('Adreno 3') || renderer.includes('PowerVR')) {
          isLowEndRef.current = true
        }
      }
    }
    // Also check for low memory
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
      isLowEndRef.current = true
    }
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const count = isLowEndRef.current ? Math.floor(CONFIG.particleCount / 2) : CONFIG.particleCount
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  }, [])

  const drawFlower = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      rotation: number,
      opacity: number,
      type: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.scale(scale, scale)
      ctx.globalAlpha = opacity * 0.4
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 1

      if (type === 0) {
        // Orchid-style flower
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.rotate((Math.PI * 2) / 5)
          ctx.moveTo(0, 0)
          ctx.bezierCurveTo(8, -4, 16, -8, 20, 0)
          ctx.bezierCurveTo(16, 8, 8, 4, 0, 0)
          ctx.stroke()
        }
        // Center
        ctx.beginPath()
        ctx.arc(0, 0, 3, 0, Math.PI * 2)
        ctx.stroke()
      } else if (type === 1) {
        // Simple leaf/petal
        ctx.beginPath()
        ctx.moveTo(0, -15)
        ctx.bezierCurveTo(10, -10, 10, 10, 0, 15)
        ctx.bezierCurveTo(-10, 10, -10, -10, 0, -15)
        ctx.stroke()
        // Vein
        ctx.beginPath()
        ctx.moveTo(0, -12)
        ctx.lineTo(0, 12)
        ctx.stroke()
      } else {
        // Star-like flower
        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          ctx.rotate((Math.PI * 2) / 6)
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -18)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(0, -18, 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      ctx.restore()
    },
    [],
  )

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Throttle to ~50-60 FPS
      const delta = time - lastTimeRef.current
      if (delta < 16) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTimeRef.current = time

      const { width, height } = canvas
      const particles = particlesRef.current
      const flowers = flowersRef.current
      const mouse = mouseRef.current

      // Clear canvas
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, width, height)

      // Optional radial glow
      if (CONFIG.enableRadialGlow) {
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.08)')
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Update and draw particles
      const connectionDist = isLowEndRef.current ? CONFIG.connectionDistance * 0.7 : CONFIG.connectionDistance

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * CONFIG.glowIntensity})`
        ctx.shadowColor = '#d4af37'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist2 < connectionDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist2 / connectionDist) * 0.3})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Spawn flowers
      if (!isLowEndRef.current && Math.random() < CONFIG.flowerSpawnRate && flowers.length < CONFIG.maxFlowers) {
        flowers.push({
          x: Math.random() * width,
          y: height + 30,
          vy: -(Math.random() * 0.5 + 0.3),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          opacity: 1,
          scale: Math.random() * 0.5 + 0.5,
          type: Math.floor(Math.random() * 3),
        })
      }

      // Update and draw flowers
      for (let i = flowers.length - 1; i >= 0; i--) {
        const f = flowers[i]
        f.y += f.vy
        f.rotation += f.rotationSpeed

        // Fade out near top
        if (f.y < height * 0.2) {
          f.opacity -= 0.005
        }

        // Remove if off screen or faded
        if (f.y < -50 || f.opacity <= 0) {
          flowers.splice(i, 1)
          continue
        }

        drawFlower(ctx, f.x, f.y, f.scale, f.rotation, f.opacity, f.type)
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [drawFlower],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationRef.current)
    }
  }, [animate, initParticles])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#1a1a1a' }} />
}

export default AnimatedBackground
