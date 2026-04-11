import { useEffect } from 'react'

export default function useCountUp() {
  useEffect(() => {
    const o = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target
          const t = parseFloat(el.dataset.target)
          const suf = el.dataset.suffix || ''
          const pre = el.dataset.prefix || ''
          const dur = 1800
          const s = performance.now()
          function tick(n) {
            const p = Math.min((n - s) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            el.textContent =
              pre +
              (Number.isInteger(t) ? Math.floor(t * ease) : (t * ease).toFixed(1)) +
              suf
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          o.unobserve(el)
        })
      },
      { threshold: 0.3 }
    )
    document.querySelectorAll('[data-target]').forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [])
}
