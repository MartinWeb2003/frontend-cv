import { useEffect, useRef } from 'react'
import { cssColor } from '../lib/cssColor'
import './FluidBackground.css'

/*
 * Slow ink in water: domain-warped fractal noise, two passes deep, shaded
 * between the paper (or ink) base and crimson. This is the one gradient the
 * design allows (CLAUDE.md, section 3): it is the signature element, it only
 * appears behind the hero and the contact chapter, and it is a static flat
 * colour until WebGL is confirmed.
 *
 * Raw WebGL rather than three.js, because this must not pull the 500 KB 3D
 * chunk onto the critical path. The whole shader is one full-screen triangle.
 */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uBase;
uniform vec3 uInk;
uniform vec3 uShade;
uniform float uStrength;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 1.6;
  float t = uTime * 0.035;

  vec2 pointer = (uPointer - 0.5) * 0.35;
  vec2 q = vec2(fbm(p + vec2(0.0, t) + pointer), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.6),
                fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.4));
  float f = fbm(p + 3.0 * r);

  float ink = smoothstep(0.45, 0.95, f * f * 1.9 + length(q) * 0.25);
  float shade = smoothstep(0.2, 0.8, length(r) * 0.75);

  vec3 col = mix(uBase, uShade, shade * 0.55 * uStrength);
  col = mix(col, uInk, ink * uStrength);

  // Fade toward the base at the bottom edge so the next section meets a flat colour.
  col = mix(uBase, col, smoothstep(0.0, 0.35, uv.y));
  gl_FragColor = vec4(col, 1.0);
}
`

const PALETTES = {
  paper: { base: '--paper', ink: '--accent', shade: '--paper-3', strength: 0.26 },
  ink: { base: '--ink', ink: '--accent-deep', shade: '--ink-3', strength: 0.6 },
  // The dark hero: deeper crimson smoke over graphite, stronger than the
  // contact chapter so the page opens on its most cinematic frame.
  ember: { base: '--ink', ink: '--accent-deep', shade: '--ink-3', strength: 0.85 },
}

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
}

/**
 * @param {{variant?: 'paper'|'ink'|'ember', className?: string}} props
 */
export default function FluidBackground({ variant = 'paper', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return undefined

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return undefined
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name) => gl.getUniformLocation(prog, name)
    const uRes = u('uRes')
    const uTime = u('uTime')
    const uPointer = u('uPointer')

    const pal = PALETTES[variant]
    gl.uniform3fv(u('uBase'), cssColor(pal.base))
    gl.uniform3fv(u('uInk'), cssColor(pal.ink))
    gl.uniform3fv(u('uShade'), cssColor(pal.shade))
    gl.uniform1f(u('uStrength'), pal.strength)

    // The noise is soft, so half resolution is indistinguishable and 4x cheaper.
    const scale = 0.5
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale))
      const h = Math.max(1, Math.round(canvas.clientHeight * scale))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
        gl.uniform2f(uRes, w, h)
      }
    }
    resize()

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onPointer = (e) => {
      pointer.tx = e.clientX / window.innerWidth
      pointer.ty = 1 - e.clientY / window.innerHeight
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now() - 40000 * Math.random()
    let raf = 0
    let visible = false

    const draw = (now) => {
      pointer.x += (pointer.tx - pointer.x) * 0.03
      pointer.y += (pointer.ty - pointer.y) * 0.03
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now) => {
      draw(now)
      raf = visible ? requestAnimationFrame(loop) : 0
    }

    // Reduced motion: one still frame. Otherwise animate only while on screen.
    if (reduce) {
      draw(start + 20000)
      canvas.classList.add('is-ready')
      return undefined
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    requestAnimationFrame(() => canvas.classList.add('is-ready'))

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [variant])

  return <canvas ref={canvasRef} className={`fluid fluid--${variant} ${className}`} aria-hidden="true" />
}
