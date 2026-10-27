import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { LOGO_POLYGONS, LOGO_SIZE } from '../data/logoShape'
import { cssHex } from '../lib/cssColor'

/*
 * The logo mark extruded into a lacquered crimson object that visitors can
 * grab and spin. Drag rotates it with inertia; when left alone it drifts
 * back to a slow idle turn. Horizontal drags spin it, vertical swipes still
 * scroll the page on touch (touch-action: pan-y on the stage).
 */
function logoGeometry() {
  const shapes = LOGO_POLYGONS.map((poly) => {
    const s = new THREE.Shape()
    poly.forEach(([x, y], i) => {
      const px = (x - LOGO_SIZE / 2) / LOGO_SIZE
      const py = (LOGO_SIZE / 2 - y) / LOGO_SIZE
      if (i === 0) s.moveTo(px, py)
      else s.lineTo(px, py)
    })
    s.closePath()
    return s
  })
  const g = new THREE.ExtrudeGeometry(shapes, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.012,
    bevelSegments: 6,
    curveSegments: 4,
  })
  g.center()
  return g
}

/** @param {{reduce: boolean, onReady?: () => void}} props */
export default function Logo3D({ reduce, onReady }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.set(0, 0, 3.1)

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(cssHex('--accent')),
      metalness: 0.35,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.2,
    })
    const mesh = new THREE.Mesh(logoGeometry(), mat)
    mesh.scale.setScalar(1.45)
    scene.add(mesh)

    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(2, 3, 4)
    scene.add(key)
    const rim = new THREE.PointLight(new THREE.Color(cssHex('--accent-lift')), 14, 10, 2)
    rim.position.set(-2.5, -1, -1.5)
    scene.add(rim)

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    /* ── Drag to spin, with inertia ── */
    const rot = { x: -0.25, y: 0.5 }
    const vel = { x: 0, y: reduce ? 0 : 0.004 }
    let drag = null
    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY, t: performance.now() }
      mount.setPointerCapture(e.pointerId)
      mount.classList.add('is-grabbing')
    }
    const onMove = (e) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      const dy = e.clientY - drag.y
      vel.y = dx * 0.006
      vel.x = dy * 0.006
      rot.y += vel.y
      rot.x += vel.x
      drag.x = e.clientX
      drag.y = e.clientY
    }
    const onUp = (e) => {
      drag = null
      mount.releasePointerCapture?.(e.pointerId)
      mount.classList.remove('is-grabbing')
    }
    mount.addEventListener('pointerdown', onDown)
    mount.addEventListener('pointermove', onMove)
    mount.addEventListener('pointerup', onUp)
    mount.addEventListener('pointercancel', onUp)

    let raf = 0
    let visible = false
    let first = true
    const tick = () => {
      if (!drag) {
        // Friction toward a gentle idle spin, and the tilt eases back upright.
        const idle = reduce ? 0 : 0.004
        vel.y += (idle - vel.y) * 0.04
        vel.x *= 0.92
        rot.y += vel.y
        rot.x += vel.x
        rot.x += (-0.2 - rot.x) * 0.02
      }
      mesh.rotation.set(rot.x, rot.y, 0)
      renderer.render(scene, camera)
      if (first) {
        first = false
        onReady?.()
      }
      raf = visible ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      mount.removeEventListener('pointerdown', onDown)
      mount.removeEventListener('pointermove', onMove)
      mount.removeEventListener('pointerup', onUp)
      mount.removeEventListener('pointercancel', onUp)
      mesh.geometry.dispose()
      mat.dispose()
      env.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      mount.removeChild(renderer.domElement)
    }
  }, [reduce, onReady])

  return <div ref={mountRef} className="hero__3d-canvas" />
}
