'use client'

import { useEffect, useRef } from 'react'

export function BackgroundParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    const particleCount = window.innerWidth < 768 ? 30 : 60

    // Configurações que funcionam em ambos os temas
   const settings = {
      particleOpacity: 0.35,
      connectionOpacity: 0.09,
      lineWidth: 0.9,
  
      particleColor: 'rgba(87, 134, 201, 0.35)' // Corrigi a sintaxe aqui
    }

    // Classe Partícula atualizada
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = settings.particleColor // Usando a cor definida nas settings
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      resizeCanvas()
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      // Limpa o canvas com transparência
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      
      connectParticles()
      requestAnimationFrame(animate)
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) + 
            Math.pow(particles[a].y - particles[b].y, 2)
          )
          
          if (distance < 120) {
            // Usei a mesma cor das partículas para as conexões, mas com menor opacidade
            ctx.strokeStyle = `rgba(87, 134, 201, ${settings.connectionOpacity})`
            ctx.lineWidth = settings.lineWidth
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    window.addEventListener('resize', resizeCanvas)
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

 return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  )
}