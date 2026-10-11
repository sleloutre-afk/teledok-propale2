'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Comportements JavaScript du site, branchés sur le balisage rendu par le
 * serveur : en-tête (état au défilement, menu des écrans étroits),
 * apparition au défilement, tracé des icônes, compteurs, enchaînement des
 * étapes de la méthode, araignée des valeurs, vidéo d'ouverture.
 *
 * Rendu par PageShell : l'effet repart à chaque changement de page. Toutes
 * les animations sont coupées si l'utilisateur a demandé moins de mouvement.
 */
export function SiteBehaviors() {
  const pathname = usePathname()

  useEffect(() => {
    const cleanups: Array<() => void> = []
    const on = <T extends EventTarget>(target: T, type: string, handler: EventListener, options?: AddEventListenerOptions) => {
      target.addEventListener(type, handler, options)
      cleanups.push(() => target.removeEventListener(type, handler, options))
    }
    const observe = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
      const io = new IntersectionObserver(callback, options)
      cleanups.push(() => io.disconnect())
      return io
    }
    const all = <T extends Element>(selector: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(selector))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ---------- En-tête ----------
    const header = document.querySelector<HTMLElement>('[data-header]')
    const burger = header?.querySelector<HTMLButtonElement>('[data-burger]')
    const burgerLabel = header?.querySelector<HTMLElement>('[data-burger-label]')

    if (header) {
      // L'en-tête de l'accueil devient opaque dès que l'on quitte le haut de page.
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 60)
      on(window, 'scroll', onScroll, { passive: true })
      onScroll()
    }
    if (header && burger && burgerLabel) {
      const setOpen = (open: boolean) => {
        header.classList.toggle('is-open', open)
        burger.setAttribute('aria-expanded', String(open))
        burgerLabel.textContent = open ? 'Fermer le menu' : 'Ouvrir le menu'
      }
      on(burger, 'click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'))
      on(header, 'keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Escape' && header.classList.contains('is-open')) {
          setOpen(false)
          burger.focus()
        }
      })
      all('.hdr-nav a', header).forEach((a) => on(a, 'click', () => setOpen(false)))
      on(window.matchMedia('(min-width: 1100px)'), 'change', () => setOpen(false))
    }

    // ---------- Apparition au défilement (.rv) et tracé des icônes (.trace) ----------
    const revealed = all<HTMLElement>('.rv')
    const traced = all<SVGElement>('.trace')

    if (reduce) {
      revealed.forEach((el) => el.classList.remove('rv'))
      traced.forEach((el) => el.classList.add('is-in'))
    } else {
      const io = observe(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            io.unobserve(entry.target)
            entry.target.classList.add('is-in')
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      revealed.forEach((el) => {
        // Une fois apparu, l'élément retrouve ses propres transitions (survol des cartes, étapes).
        on(el, 'animationend', (e) => {
          if (e.target === el) el.classList.remove('rv', 'is-in')
        })
        io.observe(el)
      })
      traced.forEach((el) => io.observe(el))
    }

    // ---------- Compteurs des chiffres clés : <span data-count data-from="0" data-to="50">50</span> ----------
    const counters = all<HTMLElement>('[data-count]')
    if (!reduce && counters.length) {
      const DURATION = 1800
      let stopped = false
      cleanups.push(() => (stopped = true))
      counters.forEach((el) => (el.textContent = el.dataset.from ?? '0'))

      const run = (el: HTMLElement) => {
        const from = Number(el.dataset.from ?? 0)
        const to = Number(el.dataset.to)
        let start: number | null = null
        const tick = (t: number) => {
          if (stopped) return
          start ??= t
          const p = Math.min(1, (t - start) / DURATION)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = String(from + Math.round((to - from) * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
      const io = observe(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            io.unobserve(entry.target)
            run(entry.target as HTMLElement)
          }
        },
        { threshold: 0.6 },
      )
      counters.forEach((el) => io.observe(el))
    }

    // ---------- Étapes de la méthode ----------
    // Les quatre étapes s'enchaînent une fois à l'entrée dans la fenêtre, puis
    // l'utilisateur garde la main (survol ou boutons d'étape).
    all<HTMLElement>('[data-steps]').forEach((root) => {
      const INTERVAL = 1500
      const steps = all<HTMLElement>('.step', root)
      const chips = all<HTMLButtonElement>('[data-step-chip]', root)
      const fill = root.querySelector<HTMLElement>('.track-fill')
      if (!steps.length) return
      let active = 0
      let timer: number | undefined
      // Dès que l'utilisateur choisit une étape, l'enchaînement automatique s'arrête (ou ne démarre pas).
      let manual = false

      const set = (i: number) => {
        active = i
        steps.forEach((s, k) => s.classList.toggle('on', k === i))
        chips.forEach((c, k) => {
          c.classList.toggle('chip-on', k === i)
          c.setAttribute('aria-pressed', String(k === i))
        })
        if (fill) fill.style.width = `${((i + 1) / steps.length) * 100}%`
      }
      const stop = () => {
        manual = true
        window.clearInterval(timer)
      }
      cleanups.push(() => window.clearInterval(timer))

      chips.forEach((c, k) =>
        on(c, 'click', () => {
          stop()
          set(k)
        }),
      )
      steps.forEach((s, k) =>
        on(s, 'pointerenter', (e) => {
          if ((e as PointerEvent).pointerType !== 'mouse') return
          stop()
          set(k)
        }),
      )

      if (reduce) {
        // Sans animation : sur l'accueil, le parcours est montré achevé.
        if (!chips.length) set(steps.length - 1)
        return
      }
      const io = observe(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return
          io.disconnect()
          if (manual) return
          timer = window.setInterval(() => {
            if (active >= steps.length - 1) return window.clearInterval(timer)
            set(active + 1)
          }, INTERVAL)
        },
        { threshold: 0.5 },
      )
      // Déclenché par la première étape : la section entière peut dépasser la hauteur de l'écran.
      io.observe(steps[0])
    })

    // ---------- Araignée des valeurs ----------
    // Une valeur est toujours sélectionnée (la première au départ) : son détail reste affiché à côté
    // de la toile. Le survol ou le focus d'un picto change la sélection et estompe les autres.
    const web = document.querySelector<HTMLElement>('[data-web]')
    const panel = document.querySelector<HTMLElement>('[data-web-panel]')
    if (web && panel) {
      const nodes = all<HTMLElement>('[data-node]', web)
      const spokes = all<SVGElement>('[data-spoke]', web)
      const details = Array.from(panel.children) as HTMLElement[]
      const select = (active: number) => {
        nodes.forEach((n, i) => n.classList.toggle('on', i === active))
        spokes.forEach((s, i) => s.classList.toggle('on', i === active))
        details.forEach((d, i) => (d.hidden = i !== active))
      }
      nodes.forEach((n, i) => {
        const enter = () => {
          select(i)
          web.classList.add('has-h')
        }
        const leave = () => web.classList.remove('has-h')
        on(n, 'mouseenter', enter)
        on(n, 'focus', enter)
        on(n, 'mouseleave', leave)
        on(n, 'blur', leave)
      })
    }

    // ---------- Vidéo d'arrière-plan de l'accueil : bouton lecture / pause ----------
    const video = document.querySelector<HTMLVideoElement>('[data-hero-video]')
    const toggle = document.querySelector<HTMLButtonElement>('[data-hero-toggle]')
    if (video && toggle) {
      const sync = () => {
        toggle.classList.toggle('is-paused', video.paused)
        toggle.setAttribute('aria-label', video.paused ? 'Lire la vidéo d’arrière-plan' : 'Mettre en pause la vidéo d’arrière-plan')
      }
      video.muted = true
      // La lecture est lancée ici plutôt que par l'attribut autoplay : la vidéo reste
      // sur son image d'attente si l'utilisateur a demandé moins d'animations.
      if (!reduce) video.play().catch(() => {})
      on(video, 'play', sync)
      on(video, 'pause', sync)
      on(toggle, 'click', () => void (video.paused ? video.play().catch(() => {}) : video.pause()))
      sync()
    }

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [pathname])

  return null
}
