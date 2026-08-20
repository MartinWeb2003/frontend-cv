import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ThreeScene.css'

export default function ThreeScene({ className = '', color = '#A51C30' }) {
  const mountRef = useRef(null)
  /**
   * The scene is built once in an effect with no dependencies, so the colour
   * cannot simply be read from the prop on every render. These refs give the
   * recolour effect below a handle on the objects that carry colour.
   */
  const paletteRef = useRef(null)
  const colorRef = useRef(color)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth || 500
    const H = el.clientHeight || 500

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Torus knot — main shape
    const geo = new THREE.TorusKnotGeometry(0.85, 0.28, 180, 24, 2, 3)
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorRef.current),
      roughness: 0.3,
      metalness: 0.7,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorRef.current), wireframe: true, opacity: 0.12, transparent: true })
    const wireMesh = new THREE.Mesh(geo, wireMat)
    wireMesh.scale.setScalar(1.015)
    scene.add(wireMesh)

    // Particle field
    const pGeo = new THREE.BufferGeometry()
    const pCount = 300
    const positions = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount * 3; i++) positions[i] = (Math.random() - 0.5) * 8
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: new THREE.Color(colorRef.current), size: 0.015, transparent: true, opacity: 0.4 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const pointLight1 = new THREE.PointLight(new THREE.Color(colorRef.current), 3, 10)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 10)
    pointLight2.position.set(-3, -2, 2)
    scene.add(pointLight2)

    paletteRef.current = { mat, wireMat, pMat, light: pointLight1 }

    // Mouse hover parallax (only when not dragging)
    const hover = { x: 0, y: 0 }
    const hoverTarget = { x: 0, y: 0 }
    const onHoverMove = (e) => {
      if (drag.active) return
      const rect = el.getBoundingClientRect()
      hover.x = ((e.clientX - rect.left) / W - 0.5) * 2
      hover.y = -((e.clientY - rect.top) / H - 0.5) * 2
    }
    el.addEventListener('mousemove', onHoverMove, { passive: true })

    // Drag state
    const drag = { active: false, lastX: 0, lastY: 0, rotX: 0, rotY: 0, velX: 0, velY: 0 }

    const getCoords = (e) => e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY }

    const onDragStart = (e) => {
      drag.active = true
      const { x, y } = getCoords(e)
      drag.lastX = x
      drag.lastY = y
      drag.velX = 0
      drag.velY = 0
      el.style.cursor = 'grabbing'
    }

    const onDragMove = (e) => {
      if (!drag.active) return
      e.preventDefault()
      const { x, y } = getCoords(e)
      const dx = x - drag.lastX
      const dy = y - drag.lastY
      drag.rotY += dx * 0.008
      drag.rotX += dy * 0.008
      drag.velX = dy * 0.008
      drag.velY = dx * 0.008
      drag.lastX = x
      drag.lastY = y
    }

    const onDragEnd = () => {
      drag.active = false
      el.style.cursor = 'grab'
    }

    el.addEventListener('mousedown', onDragStart)
    el.addEventListener('touchstart', onDragStart, { passive: true })
    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('touchmove', onDragMove, { passive: false })
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)

    el.style.cursor = 'grab'

    // Animation
    let rafId
    const clock = new THREE.Clock()
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Hover parallax (smooth lerp, ignored while dragging)
      if (!drag.active) {
        hoverTarget.x += (hover.x - hoverTarget.x) * 0.05
        hoverTarget.y += (hover.y - hoverTarget.y) * 0.05
        // Apply inertia after drag release
        drag.rotX += drag.velX
        drag.rotY += drag.velY
        drag.velX *= 0.92
        drag.velY *= 0.92
      }

      mesh.rotation.x = t * 0.18 + drag.rotX + hoverTarget.y * 0.4
      mesh.rotation.y = t * 0.28 + drag.rotY + hoverTarget.x * 0.4
      wireMesh.rotation.x = mesh.rotation.x
      wireMesh.rotation.y = mesh.rotation.y
      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.02

      pointLight1.position.x = Math.sin(t * 0.7) * 3
      pointLight1.position.y = Math.cos(t * 0.5) * 3

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      const nW = el.clientWidth
      const nH = el.clientHeight
      camera.aspect = nW / nH
      camera.updateProjectionMatrix()
      renderer.setSize(nW, nH)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(el)

    return () => {
      cancelAnimationFrame(rafId)
      el.removeEventListener('mousemove', onHoverMove)
      el.removeEventListener('mousedown', onDragStart)
      el.removeEventListener('touchstart', onDragStart)
      window.removeEventListener('mousemove', onDragMove)
      window.removeEventListener('touchmove', onDragMove)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      ro.disconnect()
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      wireMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  /**
   * Recolour in place when the preset changes. Rebuilding the scene would reset
   * the rotation and drop the WebGL context for a frame, which reads as a
   * flicker, so the existing materials and key light are mutated instead.
   */
  useEffect(() => {
    const palette = paletteRef.current
    if (!palette) return
    const c = new THREE.Color(color)
    palette.mat.color.set(c)
    palette.wireMat.color.set(c)
    palette.pMat.color.set(c)
    palette.light.color.set(c)
  }, [color])

  return <div ref={mountRef} className={`three-scene ${className}`} />
}
