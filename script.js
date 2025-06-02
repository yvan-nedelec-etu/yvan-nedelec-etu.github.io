// script.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Create full‐screen canvas for gradient + snow
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.style.position = 'fixed'
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.zIndex = -1
  document.body.prepend(canvas)

  let W, H, particles = [], angle = 0

  function resize() {
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
    initSnow()
  }

  function initSnow() {
    particles = []
    const count = Math.ceil((W * H) / 8000)
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        d: Math.random() * count
      })
    }
  }

  function draw() {
    // gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, H)
    grad.addColorStop(0, '#001f3f')    // navy
    grad.addColorStop(1, '#2e0057')    // dark violet
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // draw snow
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.beginPath()
    particles.forEach(p => {
      ctx.moveTo(p.x, p.y)
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    })
    ctx.fill()

    // update
    angle += 0.01
    particles.forEach((p, i) => {
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2
      p.x += Math.sin(angle) * 2
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          p.x = Math.random() * W
          p.y = -10
        } else {
          if (Math.sin(angle) > 0) p.x = -5
          else p.x = W + 5
          p.y = Math.random() * H
        }
      }
    })

    requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  resize()
  draw()

  // 2. Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target)
        target.scrollIntoView({ behavior: 'smooth' })
    })
  })
})