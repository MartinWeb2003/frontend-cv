import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { cssHex } from '../lib/cssColor'
import { CLOSED_POSE, poseFor, showcaseState } from './showcaseTimeline'

/*
 * A laptop built from primitives, so there is no model file to download and
 * nothing to license. Dimensions are in arbitrary units; the screen is 16:10
 * to match the project screenshots exactly, so they are never cropped.
 */
const W = 3.0          // body width
const D = 2.05         // body depth
const T = 0.085        // body thickness
const LID_T = 0.045    // lid thickness
const SCREEN_W = 2.78
const SCREEN_H = SCREEN_W / 1.6
const LID_H = SCREEN_H + 0.2

const LID_CLOSED = Math.PI / 2
const LID_OPEN = -0.24

function roundedRect(w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

/** A rounded slab lying in XZ, top face at y = thickness. */
function slab(w, d, t, r, bevel = 0.012) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w, d, r), {
    depth: t - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 10,
  })
  g.rotateX(-Math.PI / 2)
  g.translate(0, bevel, 0)
  return g
}

/** Soft contact shadow, drawn once to a canvas. */
function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(0,0,0,0.85)')
  g.addColorStop(0.45, 'rgba(0,0,0,0.35)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/**
 * Critically damped spring toward a target (the Unity SmoothDamp algorithm):
 * eases in and out, never overshoots, and is frame-rate independent. A new
 * target mid-move is picked up from the current velocity, so interrupted
 * moves stay smooth.
 */
function smoothDamp(cur, target, vel, key, smoothTime, dt) {
  const omega = 2 / smoothTime
  const x = omega * dt
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = cur[key] - target
  const temp = (vel[key] + omega * change) * dt
  vel[key] = (vel[key] - omega * temp) * exp
  cur[key] = target + (change + temp) * exp
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** How long one move between projects takes, in seconds. */
const MOVE_TIME = 0.55
/** How long the screen takes to wipe to the next site, in seconds. */
const WIPE_TIME = 0.7

const SCREEN_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const SCREEN_FRAG = `
uniform sampler2D tA;
uniform sampler2D tB;
uniform float uMix;
uniform float uOn;
varying vec2 vUv;
void main() {
  vec4 a = texture2D(tA, vUv);
  vec4 b = texture2D(tB, vUv);
  // Wipe down from the top with a soft edge, like a page being replaced.
  float edge = smoothstep(uMix * 1.2 - 0.2, uMix * 1.2, 1.0 - vUv.y);
  vec3 col = mix(b.rgb, a.rgb, edge);
  // A faint diagonal sheen sells the glass.
  float sheen = smoothstep(0.0, 1.0, 1.0 - abs(vUv.x - vUv.y * 0.6 - 0.15) * 3.0) * 0.05;
  col = col * uOn + sheen * uOn;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

/**
 * @param {{
 *   progress: import('motion/react').MotionValue<number>,
 *   images: string[],
 *   reduce: boolean,
 *   onReady: () => void,
 * }} props
 */
export default function Laptop3D({ progress, images, reduce, onReady }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return undefined // No WebGL: the CSS device fallback stays in place.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
    camera.position.set(0, 1.45, 6.9)

    /* ── Materials, coloured from CSS tokens ── */
    const aluminium = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(cssHex('--device-body')),
      metalness: 0.85,
      roughness: 0.4,
      clearcoat: 0.2,
      clearcoatRoughness: 0.45,
      envMapIntensity: 0.6,
    })
    const bezel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(cssHex('--device-bezel')),
      metalness: 0.2,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    })
    const keysMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cssHex('--device-keys')),
      metalness: 0.1,
      roughness: 0.75,
    })
    const wellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cssHex('--device-bezel')),
      roughness: 0.9,
    })

    /* ── Body ── */
    const laptop = new THREE.Group()
    scene.add(laptop)

    const body = new THREE.Mesh(slab(W, D, T, 0.12), aluminium)
    laptop.add(body)

    const well = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.86, D * 0.4), wellMat)
    well.rotation.x = -Math.PI / 2
    well.position.set(0, T + 0.0015, -D * 0.17)
    laptop.add(well)

    // Keys: one instanced mesh, 6 rows of 14.
    const cols = 14
    const rows = 6
    const keyW = (W * 0.84) / cols
    const keyD = (D * 0.38) / rows
    const keyGeo = slab(keyW * 0.82, keyD * 0.8, 0.018, 0.012, 0.004)
    const keys = new THREE.InstancedMesh(keyGeo, keysMat, cols * rows)
    const m = new THREE.Matrix4()
    let n = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        m.makeTranslation(
          -W * 0.42 + keyW * (c + 0.5),
          T,
          -D * 0.36 + keyD * (r + 0.5),
        )
        keys.setMatrixAt(n++, m)
      }
    }
    laptop.add(keys)

    const pad = new THREE.Mesh(slab(W * 0.36, D * 0.27, 0.004, 0.04, 0.001), bezel)
    pad.position.set(0, T - 0.001, D * 0.28)
    laptop.add(pad)

    /* ── Lid, pivoting on the back edge ── */
    const hinge = new THREE.Group()
    // Raised by the lid thickness so the closed lid rests on the deck, not in it.
    hinge.position.set(0, T + LID_T, -D / 2 + 0.03)
    laptop.add(hinge)

    const lidShell = new THREE.Mesh(slab(W, LID_H, LID_T, 0.12), aluminium)
    lidShell.rotation.x = Math.PI / 2
    lidShell.position.set(0, LID_H / 2, 0)
    hinge.add(lidShell)

    const glass = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedRect(W - 0.06, LID_H - 0.06, 0.1)),
      bezel,
    )
    glass.position.set(0, LID_H / 2, LID_T + 0.001)
    hinge.add(glass)

    /* ── Screen ── */
    const loader = new THREE.TextureLoader()
    let loaded = 0
    const maxAniso = renderer.capabilities.getMaxAnisotropy()
    const textures = images.map((src) => {
      const tex = loader.load(src, () => {
        loaded++
        if (loaded === 1) onReady?.()
      })
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = maxAniso
      tex.minFilter = THREE.LinearMipmapLinearFilter
      return tex
    })

    const screenMat = new THREE.ShaderMaterial({
      vertexShader: SCREEN_VERT,
      fragmentShader: SCREEN_FRAG,
      uniforms: {
        tA: { value: textures[0] },
        tB: { value: textures[0] },
        uMix: { value: 0 },
        uOn: { value: 0 },
      },
      toneMapped: false,
    })
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_W, SCREEN_H), screenMat)
    screen.position.set(0, LID_H / 2 + 0.02, LID_T + 0.003)
    hinge.add(screen)

    /* ── Shadow and light ── */
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(W * 2.1, D * 2.1),
      new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: 0.9 }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -0.01
    laptop.add(shadow)

    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(3, 5, 4)
    scene.add(key)
    const rim = new THREE.PointLight(new THREE.Color(cssHex('--accent-lift')), 18, 12, 2)
    rim.position.set(-2.6, 2.2, -2.4)
    scene.add(rim)

    /* ── Sizing ── */
    let baseZ = 6.9
    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // Narrow stages pull the camera back so the whole device stays in frame.
      baseZ = w / h < 1 ? 6.9 / Math.max(0.55, w / h) : 6.9
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    /* ── Pointer parallax ── */
    const pointer = { x: 0, y: 0 }
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true })

    /*
     * ── Frame loop ──
     * Scroll picks the state (open or closed, which project); time plays the
     * move. Each pose parameter springs toward its target, so the camera
     * glides however fast or slow the visitor scrolls.
     */
    const cur = {
      lid: reduce ? LID_OPEN : LID_CLOSED,
      ...CLOSED_POSE,
      y: -0.35,
      s: 0.86,
      on: reduce ? 1 : 0,
    }
    const vel = Object.fromEntries(Object.keys(cur).map((k) => [k, 0]))
    const target = new THREE.Vector3(0, 0.75, 0)
    const wipe = { shown: 0, next: 0, t: 1 }
    let raf = 0
    let visible = false
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const st = showcaseState(progress.get(), images.length)
      const open = reduce || st.open
      const pose = open ? poseFor(st.active) : CLOSED_POSE

      // A slow idle drift while a pose holds, so the frame never freezes.
      const drift = reduce || !open ? 0 : 1
      const time = now / 1000
      const to = {
        lid: open ? LID_OPEN : LID_CLOSED,
        rx: pose.rx + drift * (Math.sin(time * 0.27) * 0.02 + pointer.y * 0.04),
        ry: pose.ry + drift * (Math.sin(time * 0.35) * 0.05 + pointer.x * 0.07),
        rz: pose.rz,
        x: pose.x,
        y: open ? 0 : -0.35,
        s: open ? 1 : 0.86,
        on: open ? 1 : 0,
        zoom: pose.zoom,
        crane: pose.crane,
      }
      for (const key of Object.keys(cur)) {
        if (reduce) cur[key] = to[key]
        else smoothDamp(cur, to[key], vel, key, key === 'lid' ? 0.45 : MOVE_TIME, dt)
      }

      hinge.rotation.x = cur.lid
      laptop.rotation.set(cur.rx, cur.ry, cur.rz)
      laptop.position.set(cur.x, cur.y, 0)
      laptop.scale.setScalar(cur.s)

      // Screen: wipe from the site on show to the newly active one. A change
      // mid-wipe commits the incoming site first, then wipes again.
      if (st.active !== wipe.next) {
        if (wipe.t < 1) wipe.shown = wipe.next
        wipe.next = st.active
        wipe.t = reduce ? 1 : 0
      }
      if (wipe.t < 1) {
        wipe.t = Math.min(1, wipe.t + dt / WIPE_TIME)
        if (wipe.t === 1) wipe.shown = wipe.next
      }
      screenMat.uniforms.tA.value = textures[wipe.shown]
      screenMat.uniforms.tB.value = textures[wipe.next]
      screenMat.uniforms.uMix.value = wipe.t < 1 ? easeInOut(wipe.t) : 0
      screenMat.uniforms.uOn.value = cur.on

      // Dolly toward the screen centre and crane up or down per the pose.
      camera.position.z = baseZ - cur.zoom * 2.1
      camera.position.y = 1.45 + cur.crane - cur.zoom * 0.25
      target.set(cur.x * 0.5, 0.75 + cur.zoom * 0.35 + cur.crane * 0.25, -cur.zoom * 1.1)
      camera.lookAt(target)
      renderer.render(scene, camera)
      raf = visible ? requestAnimationFrame(tick) : 0
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      scene.traverse((o) => {
        o.geometry?.dispose()
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach((mt) => {
          mt?.map?.dispose()
          mt?.dispose()
        })
      })
      textures.forEach((tx) => tx.dispose())
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      mount.removeChild(renderer.domElement)
    }
  }, [progress, images, reduce, onReady])

  return <div ref={mountRef} className="showcase__canvas" aria-hidden="true" />
}
