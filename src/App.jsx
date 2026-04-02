import { useEffect, useRef } from 'react'
import {
  layoutWithLines,
  prepareWithSegments,
  walkLineRanges,
} from '@chenglou/pretext'
import './App.css'

const PAGE_MARKUP = `
<!-- Loading Screen -->
<div class="loader" id="loader">
  <span class="loader-kanji japanese-text">武士道</span>
</div>

<!-- Custom Cursor -->
<div class="custom-cursor" id="cursor"></div>

<!-- ============================================
      HERO SECTION
      ============================================ -->
<section class="hero" id="hero">
  <div class="hero-sun" id="heroSun"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-kanji japanese-text">侍</h1>
    <p class="hero-haiku japanese-text">
      古池や蛙飛び込む水の音<br>
      <span style="font-size: 0.8em; opacity: 0.7;">Furu ike ya / kawazu tobikomu / mizu no oto</span>
    </p>
    <h2 class="hero-tagline">
      <span
        class="spreadText spreadText--hero js-spread-text"
        data-text="Between Life and Death, There is Only the Blade"
        data-font="700 44px Cinzel"
        data-line-height="58"
        data-radius="98"
        data-strength="26"
        aria-label="Between Life and Death, There is Only the Blade"
      ></span>
    </h2>
  </div>
  <div class="scroll-indicator"></div>
</section>

<!-- ============================================
      ABOUT / PHILOSOPHY SECTION
      ============================================ -->
<section class="about" id="about">
  <h2 class="section-title fade-in">The Way of the Warrior</h2>
  <p class="section-subtitle fade-in japanese-text">武士道の七徳</p>
  <div class="brushstroke-divider"></div>

  <div class="about-content">
    <p class="about-text fade-in">
      The samurai lived by an unwritten code - a path of honor, discipline, and unwavering resolve.
      These seven virtues formed the foundation of Bushido, guiding warriors through the darkness
      with the light of righteousness.
    </p>

    <div class="bushido-card fade-in-left">
      <span class="kanji japanese-text">義</span>
      <h3>Rectitude</h3>
      <p>The power to decide upon a course of conduct with reason, without wavering. To die when to die is right, to strike when to strike is right.</p>
    </div>

    <div class="bushido-card fade-in-right">
      <span class="kanji japanese-text">勇</span>
      <h3>Courage</h3>
      <p>Not merely physical bravery, but the courage to do what is right. To face what must be faced, regardless of fear.</p>
    </div>

    <div class="bushido-card fade-in-left">
      <span class="kanji japanese-text">仁</span>
      <h3>Benevolence</h3>
      <p>The power to show compassion, to love others. A warrior who shows mercy is stronger than one who only knows destruction.</p>
    </div>

    <div class="bushido-card fade-in-right">
      <span class="kanji japanese-text">礼</span>
      <h3>Respect</h3>
      <p>Showing courtesy and proper etiquette at all times. Even to enemies, for without respect, we are nothing but beasts.</p>
    </div>

    <div class="bushido-card fade-in-left">
      <span class="kanji japanese-text">誠</span>
      <h3>Honesty</h3>
      <p>When you say you will do something, it is as good as done. A samurai's word is their bond, unbreakable as steel.</p>
    </div>

    <div class="bushido-card fade-in-right">
      <span class="kanji japanese-text">名誉</span>
      <h3>Honor</h3>
      <p>A true samurai is the sole judge of their own honor. The decisions you make and actions you take reflect who you truly are.</p>
    </div>

    <div class="bushido-card fade-in-left">
      <span class="kanji japanese-text">忠義</span>
      <h3>Loyalty</h3>
      <p>Devotion to those you have pledged yourself. A samurai without loyalty is a mere wanderer, lost in the wind.</p>
    </div>
  </div>
</section>

<!-- ============================================
      GALLERY / SHOWCASE SECTION
      ============================================ -->
<section class="gallery" id="gallery">
  <h2 class="section-title fade-in">Echoes of the Blade</h2>
  <p class="section-subtitle fade-in japanese-text">剣の響き</p>
  <div class="brushstroke-divider"></div>

  <div class="gallery-grid">
    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"The way of the samurai is found in death. Meditate on inevitable death and make it your constant thought."</p>
        <p class="card-author">- Yamamoto Tsunetomo</p>
      </div>
    </div>

    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #0a0a1a 0%, #15152d 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"A warrior does not think of winning or losing. A warrior only thinks of fulfilling their duty."</p>
        <p class="card-author">- Miyamoto Musashi</p>
      </div>
    </div>

    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #1a1a0a 0%, #2d2d15 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"Today is your only day. Live it fully, for tomorrow you may be dust upon the wind."</p>
        <p class="card-author">- Date Masamune</p>
      </div>
    </div>

    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #0a1a0a 0%, #152d15 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"The sword is the soul. Polish your spirit as you would polish a blade - with patience and precision."</p>
        <p class="card-author">- Unknown Samurai</p>
      </div>
    </div>

    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #1a0a1a 0%, #2d152d 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"In battle, if you make the enemy lose their rhythm, you can win with ease. Study this well."</p>
        <p class="card-author">- Miyamoto Musashi</p>
      </div>
    </div>

    <div class="gallery-card fade-in">
      <div class="card-bg" style="background: linear-gradient(135deg, #0a1a1a 0%, #152d2d 50%, #0a0a0a 100%);"></div>
      <div class="card-content">
        <p class="card-quote">"The ultimate aim of martial arts lies not in victory or defeat, but in the perfection of character."</p>
        <p class="card-author">- Gichin Funakoshi</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================
      QUOTE BANNER SECTION
      ============================================ -->
<section class="quote-banner" id="quote">
  <div class="quote-content fade-in">
    <div class="quote-mark">"</div>
    <p class="quote-text">
      The way of the warrior is to live as though you are already dead.
      When you have given up your life, you are free.
      Only then can you truly serve your lord and walk the path of honor.
    </p>
    <p class="quote-author">- Hagakure</p>
  </div>
</section>

<!-- ============================================
      FOOTER / CONTACT SECTION
      ============================================ -->
<footer class="footer" id="footer">
  <div class="footer-content">
    <h2 class="footer-title fade-in">Walk the Path</h2>
    <p class="footer-text fade-in">
      <span
        class="spreadText spreadText--footer js-spread-text"
        data-text="The journey of a thousand miles begins with a single step."
        data-font="400 16px Inter"
        data-line-height="30"
        data-radius="88"
        data-strength="16"
        aria-label="The journey of a thousand miles begins with a single step."
      ></span>
    </p>

    <hr class="japanese-hr">

    <div class="social-links fade-in">
      <a href="#" class="social-link" title="Twitter">鳥</a>
      <a href="#" class="social-link" title="Instagram">映</a>
      <a href="#" class="social-link" title="GitHub">技</a>
      <a href="#" class="social-link" title="Email">書</a>
    </div>

    <div class="footer-kanji japanese-text">道</div>
    <p class="footer-copyright">© 2024 武士道 - The Way of the Samurai</p>
  </div>
</footer>
`

function App() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) {
      return undefined
    }

    host.innerHTML = PAGE_MARKUP

    const DEFAULT_RADIUS = 94
    const DEFAULT_STRENGTH = 20
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const cleanupFns = []
    const timeoutIds = []
    const rafIds = []

    const addListener = (target, eventName, handler, options) => {
      if (!target) {
        return
      }

      target.addEventListener(eventName, handler, options)
      cleanupFns.push(() => target.removeEventListener(eventName, handler, options))
    }

    const getRepelOffset = (glyph, pointer, radius, strength) => {
      if (!pointer.active || prefersReducedMotion) {
        return { x: 0, y: 0 }
      }

      const dx = glyph.cx - pointer.x
      const dy = glyph.cy - pointer.y
      const distance = Math.hypot(dx, dy)

      if (distance >= radius || distance === 0) {
        return { x: 0, y: 0 }
      }

      const intensity = ((radius - distance) / radius) ** 2
      const push = intensity * strength

      return {
        x: (dx / distance) * push,
        y: (dy / distance) * push,
      }
    }

    const buildGlyphMap = (lineLayout, font, lineHeight, fallbackWidth) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return {
          glyphs: [],
          renderHeight: lineHeight,
          renderWidth: fallbackWidth,
        }
      }

      ctx.font = font
      const glyphs = []

      lineLayout.lines.forEach((line, lineIndex) => {
        let cursorX = 0

        Array.from(line.text).forEach((char, charIndex) => {
          const raw = ctx.measureText(char).width
          const width = raw > 0 ? raw : ctx.measureText(' ').width
          const top = lineIndex * lineHeight

          glyphs.push({
            id: `${lineIndex}-${charIndex}`,
            char,
            left: cursorX,
            top,
            width,
            cx: cursorX + width / 2,
            cy: top + lineHeight / 2,
          })

          cursorX += width
        })
      })

      return {
        glyphs,
        renderHeight: Math.max(lineHeight, lineLayout.height),
        renderWidth: Math.max(1, Math.ceil(lineLayout.width || fallbackWidth)),
      }
    }

    const createInteractiveSpreadText = (spreadHost) => {
      const text = spreadHost.dataset.text || spreadHost.textContent || ''
      const font = spreadHost.dataset.font || '600 18px Trebuchet MS'
      const lineHeight = Number(spreadHost.dataset.lineHeight || 26)
      const radius = Number(spreadHost.dataset.radius || DEFAULT_RADIUS)
      const strength = Number(spreadHost.dataset.strength || DEFAULT_STRENGTH)
      const isInlineSpread = spreadHost.classList.contains('spreadText--inline')

      if (!text.trim()) {
        return () => {}
      }

      spreadHost.textContent = ''

      const stage = document.createElement('span')
      stage.className = 'spreadText__stage'
      spreadHost.appendChild(stage)

      const state = {
        pointer: { active: false, x: 0, y: 0 },
        hostWidth: 0,
        glyphs: [],
        glyphElements: [],
      }

      const renderGlyphs = () => {
        stage.textContent = ''
        state.glyphElements = []

        state.glyphs.forEach((glyph) => {
          const span = document.createElement('span')
          span.className = 'spreadText__glyph'
          span.style.left = `${glyph.left}px`
          span.style.top = `${glyph.top}px`
          span.style.width = `${glyph.width}px`
          span.style.height = `${lineHeight}px`
          span.style.lineHeight = `${lineHeight}px`
          span.textContent = glyph.char === ' ' ? '\u00A0' : glyph.char
          stage.appendChild(span)
          state.glyphElements.push(span)
        })
      }

      const applyOffsets = () => {
        const activeTransition = 'transform 70ms linear'
        const settleTransition = 'transform 460ms cubic-bezier(0.2, 0.88, 0.25, 1)'

        state.glyphs.forEach((glyph, index) => {
          const glyphNode = state.glyphElements[index]
          if (!glyphNode) {
            return
          }

          const offset = getRepelOffset(glyph, state.pointer, radius, strength)
          glyphNode.style.transform = `translate(${offset.x}px, ${offset.y}px)`
          glyphNode.style.transition = state.pointer.active
            ? activeTransition
            : settleTransition
        })
      }

      const resolveLayoutWidth = () => {
        if (isInlineSpread) {
          // Keep inline wrappers on a single measured line and avoid narrow 120px fallback.
          return 100000
        }

        const ownWidth = spreadHost.getBoundingClientRect().width
        const parentWidth = spreadHost.parentElement
          ? spreadHost.parentElement.getBoundingClientRect().width
          : 0

        return Math.max(120, Math.max(ownWidth, parentWidth))
      }

      const recomputeLayout = () => {
        const maxWidth = resolveLayoutWidth()

        try {
          const prepared = prepareWithSegments(text, font)
          let tightWidth = 0

          walkLineRanges(prepared, maxWidth, (line) => {
            if (line.width > tightWidth) {
              tightWidth = line.width
            }
          })

          const wrappedWidth = Math.max(1, Math.ceil(tightWidth))
          const lineLayout = layoutWithLines(prepared, wrappedWidth, lineHeight)
          const mapped = buildGlyphMap(lineLayout, font, lineHeight, wrappedWidth)

          state.glyphs = mapped.glyphs
          stage.style.width = `${mapped.renderWidth}px`
          stage.style.height = `${mapped.renderHeight}px`
          spreadHost.style.minHeight = `${mapped.renderHeight}px`

          renderGlyphs()
          applyOffsets()
        } catch {
          state.glyphs = [
            {
              id: 'fallback',
              char: text,
              left: 0,
              top: 0,
              width: maxWidth,
              cx: maxWidth / 2,
              cy: lineHeight / 2,
            },
          ]

          stage.style.width = `${Math.ceil(maxWidth)}px`
          stage.style.height = `${lineHeight}px`
          spreadHost.style.minHeight = `${lineHeight}px`

          renderGlyphs()
          applyOffsets()
        }
      }

      let pointerRaf = 0

      const schedulePointerUpdate = (nextPointer) => {
        state.pointer = nextPointer
        if (pointerRaf) {
          return
        }

        pointerRaf = requestAnimationFrame(() => {
          applyOffsets()
          pointerRaf = 0
        })
      }

      const onPointerMove = (event) => {
        const rect = stage.getBoundingClientRect()
        schedulePointerUpdate({
          active: true,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }

      const onPointerLeave = () => {
        schedulePointerUpdate({ active: false, x: 0, y: 0 })
      }

      addListener(stage, 'pointermove', onPointerMove)
      addListener(stage, 'pointerleave', onPointerLeave)

      const resizeObserver = new ResizeObserver(() => {
        const nextWidth = resolveLayoutWidth()
        if (Math.abs(nextWidth - state.hostWidth) < 1) {
          return
        }

        state.hostWidth = nextWidth
        recomputeLayout()
      })

      state.hostWidth = resolveLayoutWidth()
      recomputeLayout()
      resizeObserver.observe(spreadHost.parentElement || spreadHost)

      return () => {
        resizeObserver.disconnect()
        if (pointerRaf) {
          cancelAnimationFrame(pointerRaf)
        }
      }
    }

    const applyTextTransform = (value, transform) => {
      if (transform === 'uppercase') {
        return value.toUpperCase()
      }

      if (transform === 'lowercase') {
        return value.toLowerCase()
      }

      if (transform === 'capitalize') {
        return value.replace(/\b\p{L}/gu, (char) => char.toUpperCase())
      }

      return value
    }

    const autoWrapTextNodes = () => {
      const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement
          if (!parent) {
            return NodeFilter.FILTER_REJECT
          }

          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT
          }

          if (parent.closest('.js-spread-text')) {
            return NodeFilter.FILTER_REJECT
          }

          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
            return NodeFilter.FILTER_REJECT
          }

          return NodeFilter.FILTER_ACCEPT
        },
      })

      const textNodes = []
      let currentNode = walker.nextNode()

      while (currentNode) {
        textNodes.push(currentNode)
        currentNode = walker.nextNode()
      }

      textNodes.forEach((textNode) => {
        const parent = textNode.parentElement
        const rawText = textNode.nodeValue || ''
        const content = rawText.trim()

        if (!parent || !content) {
          return
        }

        const computed = window.getComputedStyle(parent)
        const display = computed.display || 'block'
        const isInlineParent = display.startsWith('inline')

        const fontSizePx = Number.parseFloat(computed.fontSize) || 16
        const parsedLineHeight = Number.parseFloat(computed.lineHeight)
        const lineHeight = Number.isFinite(parsedLineHeight)
          ? Math.round(parsedLineHeight)
          : Math.round(fontSizePx * 1.45)

        const spreadHost = document.createElement('span')
        spreadHost.className = `spreadText js-spread-text ${
          isInlineParent ? 'spreadText--inline' : 'spreadText--flow'
        }`

        const transformedText = applyTextTransform(content, computed.textTransform)
        const computedFont = `${computed.fontWeight || '400'} ${computed.fontSize || '16px'} ${computed.fontFamily || 'Inter, sans-serif'}`

        spreadHost.dataset.text = transformedText
        spreadHost.dataset.font = computedFont
        spreadHost.dataset.lineHeight = String(Math.max(16, lineHeight))
        spreadHost.dataset.radius = String(Math.max(72, Math.round(lineHeight * 3.2)))
        spreadHost.dataset.strength = String(Math.max(10, Math.round(lineHeight * 0.85)))
        spreadHost.setAttribute('aria-label', content)

        const leading = rawText.match(/^\s+/)?.[0] || ''
        const trailing = rawText.match(/\s+$/)?.[0] || ''
        const fragment = document.createDocumentFragment()

        if (isInlineParent && leading) {
          fragment.appendChild(document.createTextNode(leading))
        }

        fragment.appendChild(spreadHost)

        if (isInlineParent && trailing) {
          fragment.appendChild(document.createTextNode(trailing))
        }

        parent.replaceChild(fragment, textNode)
      })
    }

    autoWrapTextNodes()

    const spreadCleanups = Array.from(host.querySelectorAll('.js-spread-text')).map(
      (spreadHost) => createInteractiveSpreadText(spreadHost),
    )

    const loader = host.querySelector('#loader')
    const loaderTimeout = window.setTimeout(() => {
      loader?.classList.add('hidden')
    }, 1500)
    timeoutIds.push(loaderTimeout)

    const cursor = host.querySelector('#cursor')
    let lastCursorX = 0
    let lastCursorY = 0

    const handleMouseMove = (event) => {
      if (!cursor) {
        return
      }

      const dx = event.clientX - lastCursorX
      const dy = event.clientY - lastCursorY
      if (dx || dy) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        cursor.style.setProperty('--cursor-angle', `${angle + 90}deg`)
      }

      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`
      lastCursorX = event.clientX
      lastCursorY = event.clientY
    }

    addListener(document, 'mousemove', handleMouseMove)

    const handleMouseEnter = () => cursor?.classList.add('hover')
    const handleMouseLeave = () => cursor?.classList.remove('hover')

    const updateInteractiveElements = () => {
      const interactiveElements = host.querySelectorAll(
        'a, button, .gallery-card, .bushido-card, .social-link, .spreadText',
      )

      interactiveElements.forEach((element) => {
        addListener(element, 'mouseenter', handleMouseEnter)
        addListener(element, 'mouseleave', handleMouseLeave)
      })
    }

    updateInteractiveElements()
    const cursorRefreshTimeout = window.setTimeout(updateInteractiveElements, 2000)
    timeoutIds.push(cursorRefreshTimeout)

    const heroSun = host.querySelector('#heroSun')
    const heroSection = host.querySelector('.hero')

    const onWindowScroll = () => {
      if (!heroSun || !heroSection) {
        return
      }

      const scrollY = window.scrollY
      const heroHeight = heroSection.offsetHeight

      if (scrollY < heroHeight) {
        const parallaxValue = scrollY * 0.5
        heroSun.style.transform = `translateY(${parallaxValue}px) scale(${1 + scrollY * 0.0005})`
      }
    }

    addListener(window, 'scroll', onWindowScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      },
    )

    host
      .querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
      .forEach((element) => observer.observe(element))

    cleanupFns.push(() => observer.disconnect())

    host.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      addListener(anchor, 'click', (event) => {
        event.preventDefault()
        const selector = event.currentTarget.getAttribute('href')
        const target = selector ? host.querySelector(selector) : null
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })

    host.querySelectorAll('.gallery-card').forEach((card) => {
      addListener(card, 'mousemove', (event) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      })

      addListener(card, 'mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
      })
    })

    let scrollTimeout
    addListener(window, 'scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        // Subtle effect reset on scroll stop.
      }, 150)
    })

    const tagline = host.querySelector('.hero-tagline')
    if (tagline) {
      tagline.style.opacity = '0'
      const taglineTimeout = window.setTimeout(() => {
        tagline.style.transition = 'opacity 1.5s ease'
        tagline.style.opacity = '1'
      }, 2000)
      timeoutIds.push(taglineTimeout)
    }

    return () => {
      spreadCleanups.forEach((cleanup) => cleanup())
      cleanupFns.forEach((cleanup) => cleanup())
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId))
      clearTimeout(scrollTimeout)

      rafIds.forEach((rafId) => cancelAnimationFrame(rafId))
      host.innerHTML = ''
    }
  }, [])

  return (
    <div ref={hostRef} className="samurai-app" aria-label="The Way of the Samurai" />
  )
}

export default App
