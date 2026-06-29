import { useEffect, useMemo, useState } from 'react'
import { assets, chapterCoordinates, chapters, formFields, header, sections, settings } from './data/siteContent.js'
import { eventRegions } from './data/events.js'
import { dimensions, dimensionsIntro } from './data/dimensions.js'
import { specs, specsHeader } from './data/specs.js'

function useCountdown(targetDate) {
  const getRemaining = () => {
    const total = new Date(targetDate).getTime() - Date.now()
    if (total <= 0) return { total: 0, days: '00', hours: '00', minutes: '00', seconds: '00' }
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((total / (1000 * 60)) % 60)
    const seconds = Math.floor((total / 1000) % 60)
    const pad = (value) => String(value).padStart(2, '0')
    return { total, days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) }
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [targetDate])

  return remaining
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { threshold: [0.42, 0.58, 0.72] },
    )

    sectionIds.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return active
}

function useRevealOnView() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal-block, .reveal-stagger > *'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -7% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  })
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function VideoBackground({ src, muted, className = '' }) {
  return (
    <video className={`video-bg ${className}`} src={src} autoPlay muted={muted} loop playsInline preload="metadata" />
  )
}

function FixedHeader({ muted, onToggleSound, onOpenForm }) {
  return (
    <header className="fixed-header" aria-label="Navigation principale">
      <div className="header-left">
        <img className="brand-logo" src={assets.logo} alt="Nautitech" />
      </div>
      <div className="header-right">
        <button className="sound-toggle glass-pill" type="button" onClick={onToggleSound} aria-label={muted ? header.soundOff : header.soundOn}>
          <span className="sound-dot" />
          <span>{muted ? 'Son off' : 'Son on'}</span>
        </button>
        <button className="primary-pill" type="button" onClick={onOpenForm}>{header.cta}</button>
        <button className="language-pill glass-pill" type="button">{header.language}</button>
      </div>
    </header>
  )
}

function ChapterNav({ items, activeId }) {
  return (
    <nav className="chapter-nav" aria-label="Navigation chapitres">
      <svg className="chapter-arc" viewBox="0 0 100 342" aria-hidden="true" focusable="false">
        <path d="M88 12 C18 62 2 121 14 171 C2 221 18 280 88 330" />
      </svg>
      <div className="chapter-dots">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const point = chapterCoordinates[index] ?? chapterCoordinates[chapterCoordinates.length - 1]
          return (
            <button
              key={item.id}
              type="button"
              className={[isActive ? 'is-active' : '', item.locked ? 'is-locked' : ''].filter(Boolean).join(' ')}
              style={{ '--dot-x': `${point.x}px`, '--dot-y': `${point.y}px` }}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Aller au chapitre ${index + 1} : ${item.label}`}
              title={item.label}
            >
              <span className="chapter-dot-core" />
              {item.locked ? <span className="chapter-lock" aria-hidden="true">⌂</span> : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function HeroSection({ muted }) {
  const section = sections.hero
  return (
    <section className="snap-section hero-section" id={section.id}>
      <VideoBackground src={section.backgroundVideo} muted={muted} />
      <div className="section-veils" />
      <div className="hero-content reveal-block">
        <img className="quest-logo" src={section.logo} alt="The Great Quest" />
        <h1>{section.title}</h1>
        <p>{section.description}</p>
        <button className="primary-cta" type="button" onClick={() => scrollToSection(sections.film.id)}>{section.cta}</button>
      </div>
    </section>
  )
}

function FilmSection({ muted }) {
  return (
    <section className="snap-section film-section" id={sections.film.id}>
      <VideoBackground src={sections.film.video} muted={muted} className="video-contain" />
    </section>
  )
}

function InviteSection({ muted, onOpenForm }) {
  const section = sections.invite
  return (
    <section className="snap-section invite-section" id={section.id}>
      <VideoBackground src={section.backgroundVideo} muted={muted} />
      <div className="section-veils light" />
      <div className="invite-card glass-panel reveal-block">
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <button className="primary-cta" type="button" onClick={onOpenForm}>{section.cta}</button>
      </div>
    </section>
  )
}

function EventsMapSection({ onOpenForm }) {
  const [activeRegionId, setActiveRegionId] = useState('europe')
  const activeRegion = eventRegions.find((region) => region.id === activeRegionId) ?? eventRegions[0]

  return (
    <section className="snap-section events-section" id="events">
      <div className="map-wrap reveal-block">
        {activeRegion.map ? <img key={activeRegion.map} src={activeRegion.map} alt={`Carte ${activeRegion.label}`} /> : <div className="map-placeholder">Carte bientôt disponible</div>}
      </div>
      <aside className="events-panel glass-panel reveal-block delay-1">
        <div className="region-tabs" role="tablist" aria-label="Régions">
          {eventRegions.map((region) => (
            <button
              key={region.id}
              type="button"
              disabled={!region.enabled}
              className={region.id === activeRegionId ? 'is-active' : ''}
              onClick={() => region.enabled && setActiveRegionId(region.id)}
            >
              {region.label}
            </button>
          ))}
        </div>
        <div className="events-list reveal-stagger" key={activeRegion.id}>
          {activeRegion.events.map((event) => (
            <article className="event-card" key={`${activeRegion.id}-${event.number}-${event.city}`}>
              <div className="event-meta">
                <span>{event.number}</span>
                <span>{event.date}</span>
              </div>
              <div className="event-content">
                <h3>{event.city}</h3>
                <p><strong>Lieu :</strong> {event.place}</p>
                <div className="event-actions">
                  <button type="button" disabled={event.status !== 'open'} onClick={onOpenForm}>{event.cta}</button>
                  {event.videoLabel ? <button type="button" className="ghost-action">{event.videoLabel}</button> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  )
}

function CountdownSection({ onOpenForm, remaining, shouldRender }) {
  const section = sections.countdown
  if (!shouldRender) return null

  return (
    <section className="snap-section countdown-section" id={section.id}>
      <div className="countdown-card glass-panel reveal-block">
        <span className="eyebrow">{section.eyebrow}</span>
        <h2>{section.title}</h2>
        <div className="countdown-grid reveal-stagger" aria-label="Compte à rebours">
          <div><strong>{remaining.days}</strong><span>Jours</span></div>
          <div><strong>{remaining.hours}</strong><span>Heures</span></div>
          <div><strong>{remaining.minutes}</strong><span>Min</span></div>
          <div><strong>{remaining.seconds}</strong><span>Sec</span></div>
        </div>
        <button className="primary-cta" type="button" onClick={onOpenForm}>{section.cta}</button>
      </div>
    </section>
  )
}

function VideoRevealSection({ onOpenVideo }) {
  const section = sections.videoReveal
  return (
    <section className="snap-section video-reveal-section" id={section.id}>
      <img className="image-bg" src={section.backgroundImage} alt="" aria-hidden="true" />
      <div className="section-veils" />
      <div className="video-reveal-content reveal-block">
        <h2>{section.title}</h2>
        <button className="video-card glass-panel" type="button" onClick={() => onOpenVideo(section.video)}>
          <video src={section.video} muted loop autoPlay playsInline preload="metadata" aria-hidden="true" />
          <span className="play-mark">▶</span>
          <span className="video-card-label">{section.playLabel}</span>
        </button>
      </div>
    </section>
  )
}

function DimensionsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = dimensions[activeIndex]

  return (
    <section className="snap-section dimensions-section" id="dimensions">
      <div className="dimensions-list reveal-block">
        <h2>{dimensionsIntro}</h2>
        <div className="dimension-items reveal-stagger">
          {dimensions.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={index === activeIndex ? 'dimension-item is-active' : 'dimension-item'}
              onClick={() => setActiveIndex(index)}
            >
              <span className="dimension-number">{item.number}</span>
              <span className="dimension-copy">
                <strong>{item.title}</strong>
                <em>{item.description}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="dimension-visual reveal-block delay-1">
        <img key={active.image} src={active.image} alt="Nautitech 41 Type S" />
      </div>
    </section>
  )
}

function SpecsSection() {
  return (
    <section className="snap-section specs-section" id="specs">
      <div className="specs-copy glass-panel reveal-block">
        <span className="eyebrow">{specsHeader.brand}</span>
        <h2>{specsHeader.model}</h2>
        <p>{specsHeader.title}<br /><small>{specsHeader.subtitle}</small></p>
        <dl className="specs-grid reveal-stagger">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="tech-visual reveal-block delay-1">
        <img src={specsHeader.visual} alt="Plan technique du Nautitech 41 Type S" />
      </div>
    </section>
  )
}

function FooterSection({ onOpenForm }) {
  const footer = sections.footer
  return (
    <footer className="snap-section footer-section" id={footer.id}>
      <div className="footer-grid glass-panel reveal-block">
        <div>
          <img className="footer-logo" src={assets.logoNautitech} alt="Nautitech" />
          <h2>{footer.title}</h2>
          <span className="hashtag">{footer.hashtag}</span>
        </div>
        <div>
          <button className="primary-cta" type="button" onClick={onOpenForm}>{footer.primaryCta}</button>
          <button className="text-link" type="button">{footer.rangeLabel}</button>
        </div>
        <div>
          <h3>{footer.contactTitle}</h3>
          <button className="text-link" type="button">{footer.phoneLabel}</button>
          <p>{footer.contactText}</p>
          <button className="text-link" type="button" onClick={onOpenForm}>{footer.formLabel}</button>
        </div>
        <div>
          <h3>{footer.joinLabel}</h3>
          <button className="text-link" type="button">{footer.legalLabel}</button>
        </div>
      </div>
    </footer>
  )
}

function FormModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="form-modal glass-panel" role="dialog" aria-modal="true" aria-labelledby="form-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fermer">×</button>
        <span className="eyebrow">Nautitech 41 Type S</span>
        <h2 id="form-title">Réservez votre essai</h2>
        <p>Indiquez vos informations, l’équipe Nautitech pourra revenir vers vous avec les prochaines disponibilités.</p>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          {formFields.map((field) => (
            <label key={field.name}>
              <span>{field.label}{field.required ? ' *' : ''}</span>
              <input name={field.name} type={field.type} required={field.required} />
            </label>
          ))}
          <label className="form-full">
            <span>Message</span>
            <textarea name="message" rows="4" />
          </label>
          <button className="primary-cta form-full" type="submit">Envoyer la demande</button>
        </form>
      </div>
    </div>
  )
}

function VideoModal({ src, onClose }) {
  if (!src) return null

  return (
    <div className="video-overlay" role="presentation" onMouseDown={onClose}>
      <div className="fullscreen-video" role="dialog" aria-modal="false" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fermer">×</button>
        <video src={src} controls autoPlay playsInline />
      </div>
    </div>
  )
}

function App() {
  const [muted, setMuted] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')

  const countdownRemaining = useCountdown(sections.countdown.targetDate)
  const countdownShouldRender = settings.countdownVisibleDuringDev || !sections.countdown.hideWhenFinished || countdownRemaining.total > 0

  const navItems = useMemo(() => {
    const items = [
      { id: sections.hero.id, label: chapters[0] },
      { id: sections.film.id, label: chapters[1] },
      { id: sections.invite.id, label: chapters[2] },
      { id: 'events', label: chapters[3] },
    ]

    if (countdownShouldRender) {
      items.push({
        id: sections.countdown.id,
        label: chapters[4],
        locked: settings.showLockedNavState && countdownRemaining.total > 0,
      })
    }

    items.push(
      { id: sections.videoReveal.id, label: chapters[5] },
      { id: 'dimensions', label: chapters[6] },
      { id: 'specs', label: chapters[7] },
      { id: sections.footer.id, label: chapters[8] },
    )

    return items
  }, [countdownShouldRender, countdownRemaining.total])

  const sectionIds = useMemo(() => navItems.map((item) => item.id), [navItems])
  const activeId = useActiveSection(sectionIds)
  useRevealOnView()

  useEffect(() => {
    if (activeId !== sections.videoReveal.id) setVideoSrc('')
  }, [activeId])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setFormOpen(false)
        setVideoSrc('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <FixedHeader muted={muted} onToggleSound={() => setMuted((value) => !value)} onOpenForm={() => setFormOpen(true)} />
      <ChapterNav items={navItems} activeId={activeId} />
      <main className={settings.snapScroll ? 'app-shell has-snap' : 'app-shell'}>
        <HeroSection muted={muted} />
        <FilmSection muted={muted} />
        <InviteSection muted={muted} onOpenForm={() => setFormOpen(true)} />
        <EventsMapSection onOpenForm={() => setFormOpen(true)} />
        <CountdownSection onOpenForm={() => setFormOpen(true)} remaining={countdownRemaining} shouldRender={countdownShouldRender} />
        <VideoRevealSection onOpenVideo={setVideoSrc} />
        <DimensionsSection />
        <SpecsSection />
        <FooterSection onOpenForm={() => setFormOpen(true)} />
      </main>
      <FormModal open={formOpen} onClose={() => setFormOpen(false)} />
      <VideoModal src={videoSrc} onClose={() => setVideoSrc('')} />
    </>
  )
}

export default App
