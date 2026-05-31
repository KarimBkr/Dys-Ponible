import * as React from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { FAQ_ITEMS, SITE } from '@/seo/site';
import { useIsMobile } from '@/hooks/use-mobile';

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */

interface DiplomaCard {
  id: string;
  label: string;
  title: string;
  school: string;
  year: string;
}
interface ContactItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  target?: string;
}
interface VideoCard {
  id: string;
  tag: string;
  title: string;
  source: string;
  youtubeId: string | null;
  thumbnailUrl: string;
  embedUrl: string | null;
  externalUrl: string | null;
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const DIPLOMA_CARDS: DiplomaCard[] = [{
  id: 'incl',
  label: 'DIPLÔME UNIVERSITAIRE',
  title: 'Éducation inclusive',
  school: 'INSPE Lyon 1',
  year: '2025 — 2026'
}, {
  id: 'lang',
  label: 'DIPLÔME UNIVERSITAIRE',
  title: 'Troubles du langage & des apprentissages',
  school: 'INSEI',
  year: '2022 — 2023'
}, {
  id: 'etr',
  label: 'DIPLÔME UNIVERSITAIRE',
  title: "Enseignement français à l'étranger",
  school: 'INSPE Clermont-Auvergne',
  year: '2024 — 2025'
}];
const CONTACT_ITEMS: ContactItem[] = [{
  id: 'tel',
  icon: '📞',
  label: 'Téléphone',
  value: '06 09 49 01 43',
  href: 'tel:0609490143'
}, {
  id: 'email',
  icon: '✉',
  label: 'Email',
  value: 'ayouazsouhad@gmail.com',
  href: 'mailto:ayouazsouhad@gmail.com'
}, {
  id: 'li',
  icon: '↗',
  label: 'LinkedIn',
  value: 'Souhad Abdelhadi',
  href: 'https://www.linkedin.com/in/souhad-abdelhadi-1714a9283',
  target: '_blank'
}, {
  id: 'fb',
  icon: 'f',
  label: 'Facebook',
  value: 'Souhad Ayouaz',
  href: 'https://www.facebook.com/profile.php?id=100076505979771',
  target: '_blank'
}];

const SITE_IMAGES = {
  triCouleurs: '/images/tri-couleurs.jpeg',
  machineAddition: '/images/machine-addition.jpeg',
  ideogrammes: '/images/ideogrammes.jpeg',
} as const;

const galleryImgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
};

const galleryCaptionStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  margin: 0,
  padding: '0.65rem 1rem',
  fontFamily: "'Instrument Sans', sans-serif",
  fontSize: '0.75rem',
  fontWeight: 500,
  color: 'white',
  background: 'linear-gradient(transparent, oklch(0.2 0.02 255 / 0.75))',
};

function galleryImgHover(e: React.MouseEvent<HTMLImageElement>): void {
  e.currentTarget.style.transform = 'scale(1.03)';
}

function galleryImgReset(e: React.MouseEvent<HTMLImageElement>): void {
  e.currentTarget.style.transform = 'scale(1)';
}
const HERO_CREDENTIALS = [{
  id: 'c1',
  text: 'DU Éducation inclusive — INSPE Lyon 1'
}, {
  id: 'c2',
  text: 'DU Troubles du langage — INSEI'
}, {
  id: 'c3',
  text: 'Formation ABA, TEACCH, Makaton'
}];
const ABOUT_STATS = [{
  id: 's1',
  number: 'Maternelle → Collège',
  desc: 'Tous niveaux scolaires'
}, {
  id: 's2',
  number: 'Sur-mesure',
  desc: 'Séances individualisées'
}, {
  id: 's3',
  number: 'À domicile & à distance',
  desc: 'Selon vos besoins'
}];
const VIDEO_CARDS: VideoCard[] = [{
  id: 'v1',
  tag: 'DYS',
  title: 'Dyslexie, dysorthographie, dyscalculie — comprendre les troubles',
  source: 'Inserm',
  youtubeId: 'fFQ1vmkebNA',
  thumbnailUrl: 'https://i.ytimg.com/vi/fFQ1vmkebNA/sddefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/fFQ1vmkebNA',
  externalUrl: null
}, {
  id: 'v2',
  tag: 'TÉMOIGNAGE',
  title: "Troubles DYS à l'école — témoignage d'une mère et de son fils",
  source: 'France Culture',
  youtubeId: 'wJ24ip01MPg',
  thumbnailUrl: 'https://i.ytimg.com/vi/wJ24ip01MPg/sddefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/wJ24ip01MPg',
  externalUrl: null
}, {
  id: 'v3',
  tag: 'TSA',
  title: 'Le trouble du spectre de l\'autisme (TSA) — comprendre en 2 minutes',
  source: 'Institut du Cerveau',
  youtubeId: null,
  thumbnailUrl: '',
  embedUrl: null,
  externalUrl: 'https://institutducerveau.org/videos/comprendre-en-2-minutes/comprendre-en-2-minutes-trouble-spectre-lautisme-tsa'
}];

/* ═══════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════ */

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(() => typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.15
    });
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, [ref]);
}

/* ═══════════════════════════════════════════════════
   STICKY HEADER
═══════════════════════════════════════════════════ */

function StickyHeader() {
  const [visible, setVisible] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('');
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0
  });
  const [indicatorReady, setIndicatorReady] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const navLinks = [{
    id: 'about',
    href: '#about',
    label: 'Profil'
  }, {
    id: 'en-images',
    href: '#en-images',
    label: 'Approche'
  }, {
    id: 'expertises',
    href: '#expertises',
    label: 'Expertises'
  }, {
    id: 'ressources',
    href: '#ressources',
    label: 'Ressources'
  }, {
    id: 'formations',
    href: '#formations',
    label: 'Formations'
  }, {
    id: 'faq',
    href: '#faq',
    label: 'FAQ'
  }, {
    id: 'contact',
    href: '#contact',
    label: 'Contact'
  }];
  const navRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight * 100 : 0;
      setScrollProgress(progress);
      const sectionIds = ['about', 'en-images', 'expertises', 'ressources', 'formations', 'faq', 'contact'];
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  React.useEffect(() => {
    const idx = navLinks.findIndex(item => item.id === activeSection);
    const el = navRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width
      });
      if (!indicatorReady) {
        setTimeout(() => setIndicatorReady(true), 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);
  React.useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);
  const closeMenu = () => setMenuOpen(false);
  const showHeader = isMobile || visible || menuOpen;

  const mobileMenu = menuOpen
    ? createPortal(
        <>
          <button
            type="button"
            className="site-header__backdrop"
            aria-label="Fermer le menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav"
            className="site-header__mobile-nav"
            aria-label="Navigation mobile"
            style={{ top: headerRef.current?.offsetHeight ?? 57 }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={isActive ? 'is-active' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              );
            })}
            <a href="#contact" className="site-header__mobile-cta" onClick={closeMenu}>
              Me contacter
            </a>
          </nav>
        </>,
        document.body,
      )
    : null;

  return <>
    <header
      ref={headerRef}
      className="site-header"
      style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'oklch(0.97 0.013 80 / 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--ds-border)',
    padding: '0.9rem 7vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 350ms ease'
  }}>
      {/* Scroll progress bar */}
      <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      width: `${scrollProgress}%`,
      background: 'var(--sage)',
      transition: 'width 80ms linear',
      borderRadius: '0 2px 2px 0'
    }} />

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '1.15rem',
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
        aria-label={`${SITE.name} — retour en haut de page`}
      >
        {SITE.name}
      </a>

      <div className="site-header__actions" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
        {/* Nav links wrapper — desktop */}
        <div className="site-header__nav site-header__nav--desktop" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
          {navLinks.map((link, i) => {
          const isActive = activeSection === link.id;
          return <a key={link.id} href={link.href} ref={el => {
            navRefs.current[i] = el;
          }} style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: isActive ? 600 : 500,
            fontSize: '0.82rem',
            color: isActive ? 'var(--sage)' : 'var(--ink-mid)',
            textDecoration: 'none',
            transition: 'color 200ms ease, font-weight 150ms ease',
            whiteSpace: 'nowrap'
          }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sage)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = isActive ? 'var(--sage)' : 'var(--ink-mid)'}>
                {link.label}
              </a>;
        })}

          {/* Sliding underline indicator */}
          {indicatorStyle.width > 0 && <div aria-hidden="true" style={{
          position: 'absolute',
          bottom: -4,
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          height: 2,
          borderRadius: 2,
          background: 'var(--sage)',
          transition: indicatorReady ? 'left 300ms cubic-bezier(0.16, 1, 0.3, 1), width 300ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          pointerEvents: 'none'
        }} />}
        </div>

        {/* CTA pill — desktop */}
        <a href="#contact" className="site-header__cta site-header__cta--desktop" style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.82rem',
        color: 'white',
        background: 'var(--sage)',
        padding: '0.5rem 1.2rem',
        borderRadius: '999px',
        textDecoration: 'none',
        transition: 'background 220ms ease'
      }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'oklch(0.48 0.09 152)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sage)'}>
          Me contacter
        </a>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>
    </header>
    {mobileMenu}
  </>;
}

/* ═══════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════ */

function HeroSection() {
  return <section
    aria-labelledby="hero-heading"
    className="hero-section"
    style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100vh',
    minHeight: '600px',
    background: 'var(--parchment)',
    overflow: 'hidden'
  }}>
      {/* Left — text */}
      <div className="hero-section__text" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: '7vw',
      paddingRight: '4vw',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      position: 'relative'
    }}>
        {/* Overline pill */}
        <span className="hero-anim hero-anim-0" style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 500,
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--sage)',
        background: 'var(--sage-tint)',
        border: '1px solid var(--ds-border)',
        borderRadius: '999px',
        padding: '0.3rem 0.8rem',
        width: 'fit-content'
      }}>
          {SITE.name} · Éducation inclusive · DYS · TSA · TDA/H
        </span>

        {/* Name heading */}
        <div className="hero-anim hero-anim-1" style={{
        marginTop: '1.6rem',
        lineHeight: 1.05
      }}>
          <h1 id="hero-heading" style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          lineHeight: 1.05,
          color: 'var(--ink)',
          margin: 0
        }}>
            <span style={{
            fontWeight: 300,
            display: 'block'
          }}>Souhad</span>
            <span style={{
            fontWeight: 400,
            fontStyle: 'italic',
            display: 'block'
          }}>Ayouaz</span>
          </h1>
        </div>

        {/* Title */}
        <p className="hero-anim hero-anim-2" style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 500,
        fontSize: '1.05rem',
        color: 'var(--ink-mid)',
        marginTop: '1.2rem',
        lineHeight: 1.5,
        maxWidth: '380px'
      }}>
          {SITE.tagline}
          <span style={{ display: 'block', marginTop: '0.35rem', fontWeight: 400, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            avec Souhad Ayouaz
          </span>
        </p>

        {/* Rule + desc */}
        <div className="hero-anim hero-anim-3">
          <hr style={{
          border: 'none',
          height: '1px',
          width: '56px',
          background: 'var(--sage-dim)',
          margin: '1.5rem 0'
        }} />
          <p style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.9rem',
          color: 'var(--ink-mid)',
          lineHeight: 1.75,
          maxWidth: '420px',
          margin: 0
        }}>
            Je propose un soutien scolaire individualisé pour les enfants avec ou sans troubles
            spécifiques — DYS, TSA, TDA/H — de la maternelle au collège. Chaque séance est pensée
            sur-mesure pour redonner confiance et réconcilier l&apos;enfant avec ses apprentissages.
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-anim hero-anim-4" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.8rem',
        marginTop: '2rem'
      }}>
          <a href="#contact" style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'white',
          background: 'var(--sage)',
          padding: '0.8rem 1.6rem',
          borderRadius: '999px',
          textDecoration: 'none',
          transition: 'background 220ms ease',
          display: 'inline-block'
        }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'oklch(0.48 0.09 152)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sage)'}>
            Me contacter →
          </a>
          <a href="#expertises" style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 500,
          fontSize: '0.875rem',
          color: 'var(--ink)',
          background: 'transparent',
          border: '1.5px solid var(--ds-border)',
          padding: '0.8rem 1.6rem',
          borderRadius: '999px',
          textDecoration: 'none',
          transition: 'border-color 220ms ease, color 220ms ease',
          display: 'inline-block'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--sage)';
          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sage)';
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--ds-border)';
          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)';
        }}>
            Mes expertises →
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint hero-anim hero-anim-5" style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '7vw',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
          <div className="scroll-line" style={{
          width: '1px',
          height: '32px',
          background: 'var(--sage-dim)',
          flexShrink: 0
        }} />
          <span style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.72rem',
          color: 'var(--ink-soft)'
        }}>
            Défiler pour découvrir
          </span>
        </div>
      </div>

      {/* Right — citation */}
      <div className="hero-section__visual" style={{
      backgroundImage: ['linear-gradient(oklch(0.55 0.09 152) 0%, oklch(0.44 0.10 158) 100%)', 'repeating-linear-gradient(0deg, transparent, transparent 39px, oklch(1 0 0 / 0.04) 40px)', 'repeating-linear-gradient(90deg, transparent, transparent 39px, oklch(1 0 0 / 0.04) 40px)'].join(', '),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 3rem'
    }}>
        <blockquote className="hero-anim hero-anim-2" style={{
        fontFamily: "'Fraunces', serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
        color: 'rgba(255,255,255,0.80)',
        lineHeight: 1.5,
        maxWidth: '320px',
        textAlign: 'center',
        margin: 0
      }}>
          « Chaque enfant peut apprendre — avec la bonne approche, au bon rythme. »
        </blockquote>

        <hr className="hero-anim hero-anim-3" style={{
        border: 'none',
        height: '1px',
        width: '40px',
        background: 'rgba(255,255,255,0.30)',
        margin: '1.5rem auto'
      }} />

        <div className="hero-anim hero-anim-4" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
      }}>
          {HERO_CREDENTIALS.map(cred => <div key={cred.id} style={{
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-start'
        }}>
              <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.50)',
            flexShrink: 0,
            marginTop: '0.45rem'
          }} aria-hidden="true" />
              <span style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.4
          }}>
                {cred.text}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 2 — ABOUT
═══════════════════════════════════════════════════ */

function AboutSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return <section id="about" ref={ref} aria-labelledby="about-heading" className="section-block" style={{
    background: 'var(--white)',
    padding: '7rem 7vw'
  }}>
      <div className="about-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr 1.4fr',
      gap: '3rem',
      alignItems: 'start',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Left */}
        <div>
          <span className="reveal" style={{
          display: 'block',
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--gold)'
        }}>
            PROFIL
          </span>
          <h2 id="about-heading" className="reveal" style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          color: 'var(--ink)',
          lineHeight: 1.1,
          marginTop: '0.8rem'
        }}>
            Un accompagnement pensé pour chaque enfant
          </h2>
        </div>

        {/* Centre — aides visuelles */}
        <div
          className="about-grid__image reveal"
          style={{
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px oklch(0.2 0.02 255 / 0.08)',
          }}
        >
          <img
            src={SITE_IMAGES.ideogrammes}
            alt="Aides visuelles et idéogrammes pour la construction de phrases — méthode pédagogique adaptée"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              verticalAlign: 'middle',
            }}
          />
        </div>

        {/* Right */}
        <div>
          <p className="reveal" style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '1rem',
          color: 'var(--ink-mid)',
          lineHeight: 1.8,
          maxWidth: '560px',
          margin: 0
        }}>
            {SITE.name} est un accompagnement à domicile ou à distance pour les enfants qui ont besoin
            d&apos;un regard différent sur leurs apprentissages. Ma démarche est bienveillante,
            structurée, et toujours adaptée au profil de l&apos;enfant — qu&apos;il présente des
            troubles identifiés ou simplement des difficultés scolaires persistantes.
          </p>

          <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginTop: '2.5rem'
        }}>
            {ABOUT_STATS.map(stat => <div key={stat.id} className="reveal">
                <span style={{
              display: 'block',
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              fontSize: '1.6rem',
              color: 'var(--sage)'
            }}>
                  {stat.number}
                </span>
                <span style={{
              display: 'block',
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 400,
              fontSize: '0.78rem',
              color: 'var(--ink-soft)',
              marginTop: '0.25rem'
            }}>
                  {stat.desc}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 3 — EN IMAGES (photo gallery)
═══════════════════════════════════════════════════ */

function EnImagesSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return <section id="en-images" ref={ref} className="section-block section-block--compact" style={{
    background: 'var(--white)',
    padding: '5rem 7vw'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Header */}
        <span className="reveal" style={{
        display: 'block',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }}>
          APPROCHE
        </span>
        <h2 className="reveal" style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: 'var(--ink)',
        marginTop: '0.6rem',
        marginBottom: 0
      }}>
          Un environnement pensé pour apprendre
        </h2>
        <p className="reveal" style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        fontSize: '0.9rem',
        color: 'var(--ink-soft)',
        marginTop: '0.5rem',
        marginBottom: 0
      }}>
          Puzzles, objets sensoriels, matériel adapté — des outils qui rendent les apprentissages
          concrets et accessibles.
        </p>

        {/* Galerie — photos de séances */}
        <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        alignItems: 'stretch',
        marginTop: '2.5rem'
      }}>
          <figure className="reveal" style={{
            margin: 0,
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            height: '320px',
          }}>
            <img
              src={SITE_IMAGES.triCouleurs}
              alt="Tri par couleurs — activité sensorielle et logique pour l'apprentissage"
              style={galleryImgStyle}
              onMouseEnter={galleryImgHover}
              onMouseLeave={galleryImgReset}
            />
            <figcaption style={galleryCaptionStyle}>Tri sensoriel & logique</figcaption>
          </figure>
          <figure className="reveal" style={{
            margin: 0,
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            height: '320px',
          }}>
            <img
              src={SITE_IMAGES.machineAddition}
              alt="Machine à additionner — manipulation concrète en mathématiques"
              style={galleryImgStyle}
              onMouseEnter={galleryImgHover}
              onMouseLeave={galleryImgReset}
            />
            <figcaption style={galleryCaptionStyle}>Mathématiques concrètes</figcaption>
          </figure>
          <figure className="reveal" style={{
            margin: 0,
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            height: '320px',
          }}>
            <img
              src={SITE_IMAGES.ideogrammes}
              alt="Idéogrammes et aides visuelles pour structurer les phrases"
              style={galleryImgStyle}
              onMouseEnter={galleryImgHover}
              onMouseLeave={galleryImgReset}
            />
            <figcaption style={galleryCaptionStyle}>Aides visuelles & langage</figcaption>
          </figure>
        </div>

        {/* Caption */}
        <p className="reveal" style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '0.78rem',
        color: 'var(--ink-soft)',
        textAlign: 'center',
        marginTop: '1.5rem',
        marginBottom: 0
      }}>
          Chaque séance est un espace de confiance, de découverte et de progression.
        </p>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 4 — EXPERTISE TABS
═══════════════════════════════════════════════════ */

interface ExpertiseFeatureCard {
  id: string;
  tag: string;
  num: string;
  title: string;
  teaser: string;
  details: string[];
}
const EXPERTISE_FEATURE_CARDS: ExpertiseFeatureCard[] = [{
  id: 'dys',
  tag: 'DYS',
  num: '01',
  title: 'Troubles des apprentissages',
  teaser: 'Dyslexie, dysorthographie, dyspraxie, dysgraphie — repérage précis et accompagnement pédagogique individualisé.',
  details: ['Identification et bilan des profils DYS', 'Remédiations pédagogiques individualisées', 'Aménagements scolaires (PAP, PPRE)', 'Travail en lien avec orthophonistes et psychomotriciens']
}, {
  id: 'tsa',
  tag: 'TSA',
  num: '02',
  title: "Spectre de l'autisme",
  teaser: "Approches TEACCH, CAA, Makaton — structuration de l'environnement et communication augmentative.",
  details: ["Structuration de l'environnement et des tâches", 'Communication Alternative et Augmentée (CAA)', 'Programmes éducatifs individualisés (PEI)', 'Coordination avec DITEP, SESSAD, IME']
}, {
  id: 'soutien',
  tag: 'SOUTIEN',
  num: '03',
  title: 'Soutien scolaire adapté',
  teaser: 'Lecture, écriture, calcul — méthodes Montessori & Singapour, de la maternelle au collège.',
  details: ['Remédiation en lecture et écriture', 'Numération et calcul différencié', 'Méthode Singapour (mathématiques)', 'Pédagogie Montessori adaptée']
}, {
  id: 'ressource',
  tag: 'RESSOURCE',
  num: '04',
  title: 'Personne ressource',
  teaser: 'ESS, PAP, PPS — coordination pluridisciplinaire et lien fort entre familles, équipes et institutions.',
  details: ['Animation et participation aux réunions ESS', 'Rédaction et suivi des PAP / PPS', 'Formation et conseil aux équipes enseignantes', 'Médiation famille–école–médico-social']
}];
function ExpertiseSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [displayedIndex, setDisplayedIndex] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    }), {
      threshold: 0.1
    });
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  const handleTabClick = (index: number) => {
    if (index === activeIndex || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayedIndex(index);
      setActiveIndex(index);
      setAnimating(false);
    }, 120);
  };
  const card = EXPERTISE_FEATURE_CARDS[displayedIndex];
  const TAB_HEIGHT = 72;
  return <section id="expertises" ref={sectionRef} aria-labelledby="expertises-heading" className="section-block" style={{
    background: 'var(--parchment)',
    padding: '7rem 7vw'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Header */}
        <span className="reveal" style={{
        display: 'block',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }}>
          EXPERTISES
        </span>
        <h2 id="expertises-heading" className="reveal" style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: 'var(--ink)',
        marginTop: '0.6rem',
        marginBottom: 0
      }}>
          Domaines de spécialisation
        </h2>

        {/* Main layout: tabs + feature card */}
        <div className="reveal expertise-grid" style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '4rem',
        alignItems: 'stretch',
        marginTop: '3.5rem'
      }}>
          {/* LEFT — Tab navigation */}
          <div className="expertise-tabs" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          position: 'relative'
        }}>
            <div className="expertise-tabs__track" aria-hidden="true" style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--sage-tint)',
            borderRadius: '1px'
          }} />
            <div className="expertise-tabs__track expertise-tabs__track--active" aria-hidden="true" style={{
            position: 'absolute',
            left: 0,
            width: '2px',
            height: `${TAB_HEIGHT}px`,
            background: 'var(--sage)',
            borderRadius: '1px',
            top: `${activeIndex * TAB_HEIGHT}px`,
            transition: 'top 300ms cubic-bezier(0.16, 1, 0.3, 1)'
          }} />

            {EXPERTISE_FEATURE_CARDS.map((tab, i) => {
            const isActive = i === activeIndex;
            return <button key={tab.id} type="button" className="expertise-tab-btn" onClick={() => handleTabClick(i)} aria-selected={isActive} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.2rem 1.4rem',
              borderRadius: '12px',
              cursor: 'pointer',
              border: isActive ? '1px solid var(--ds-border)' : '1px solid transparent',
              background: isActive ? 'var(--white)' : 'transparent',
              boxShadow: isActive ? '0 2px 16px oklch(0 0 0 / 0.06)' : 'none',
              transition: 'background 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
              textAlign: 'left',
              height: `${TAB_HEIGHT}px`,
              width: '100%',
              outline: 'none',
              position: 'relative',
              zIndex: 1
            }}>
                  <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1.1rem',
                color: isActive ? 'var(--sage)' : 'var(--ink-soft)',
                flexShrink: 0,
                transition: 'color 200ms ease',
                lineHeight: 1
              }}>
                    {tab.num}
                  </span>

                  <span style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.18rem',
                flex: 1,
                minWidth: 0
              }}>
                    {isActive && <span style={{
                  display: 'inline-block',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'var(--sage-tint)',
                  color: 'var(--sage)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  width: 'fit-content',
                  lineHeight: 1.4
                }}>
                        {tab.tag}
                      </span>}
                    <span className="expertise-tab-title" style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: isActive ? 'var(--ink)' : 'var(--ink-mid)',
                  transition: 'color 200ms ease',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                      {tab.title}
                    </span>
                  </span>

                  {isActive && <span style={{
                color: 'var(--sage)',
                marginLeft: 'auto',
                fontSize: '1rem',
                flexShrink: 0,
                lineHeight: 1
              }}>
                      →
                    </span>}
                </button>;
          })}
          </div>

          {/* RIGHT — Feature card */}
          <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateX(14px)' : 'translateX(0)',
          transition: animating ? 'opacity 100ms ease, transform 100ms ease' : 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <div className="expertise-card" style={{
            background: 'var(--white)',
            borderRadius: '20px',
            border: '1px solid var(--ds-border)',
            padding: '3rem',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 32px oklch(0 0 0 / 0.06)',
            height: '100%',
            boxSizing: 'border-box'
          }}>
              {/* Decorative watermark number */}
              <span className="expertise-card__watermark" aria-hidden="true" style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '2rem',
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: '14rem',
              color: 'var(--sage-tint)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0
            }}>
                {card.num}
              </span>

              {/* Card content */}
              <div style={{
              position: 'relative',
              zIndex: 1
            }}>
                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                  <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--sage)',
                  background: 'var(--sage-tint)',
                  border: '1px solid var(--ds-border)',
                  borderRadius: '999px',
                  padding: '0.3rem 0.8rem'
                }}>
                    {card.tag}
                  </span>
                  <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '1rem',
                  color: 'var(--ink-soft)'
                }}>
                    {card.num}
                  </span>
                </div>

                <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                color: 'var(--ink)',
                lineHeight: 1.05,
                marginTop: '1.2rem',
                marginBottom: 0
              }}>
                  {card.title}
                </h3>

                <p style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--ink-mid)',
                lineHeight: 1.7,
                marginTop: '0.9rem',
                maxWidth: '480px',
                marginBottom: 0
              }}>
                  {card.teaser}
                </p>

                <hr style={{
                border: 'none',
                height: '1.5px',
                width: '56px',
                background: 'var(--sage-dim)',
                margin: '1.6rem 0'
              }} />

                <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}>
                  {card.details.map(detail => <li key={detail} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.7rem',
                  alignItems: 'flex-start'
                }}>
                      <span style={{
                    color: 'var(--sage)',
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    marginTop: '0.15rem',
                    lineHeight: 1
                  }}>
                        →
                      </span>
                      <span style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    color: 'var(--ink-mid)',
                    lineHeight: 1.55
                  }}>
                        {detail}
                      </span>
                    </li>)}
                </ul>

                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2.4rem',
                paddingTop: '1.6rem',
                borderTop: '1px solid var(--ds-border)'
              }}>
                  <span style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  color: 'var(--ink-soft)'
                }}>
                    Cliquez sur un domaine pour explorer
                  </span>
                  <a href="#contact" style={{
                  display: 'inline-block',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  color: 'white',
                  background: 'var(--sage)',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'background 220ms ease',
                  flexShrink: 0
                }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'oklch(0.48 0.09 152)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sage)'}>
                    Me contacter →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 5 — RESSOURCES (video section)
═══════════════════════════════════════════════════ */

function VideoCardItem({
  card
}: {
  card: VideoCard;
}) {
  const [playing, setPlaying] = React.useState(false);
  if (card.externalUrl) {
    // Non-YouTube card (Institut du Cerveau)
    return <div style={{
      background: 'var(--white)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--ds-border)',
      boxShadow: '0 2px 16px oklch(0 0 0 / 0.06)',
      transition: 'transform 300ms ease, box-shadow 300ms ease'
    }} onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px oklch(0 0 0 / 0.10)';
    }} onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px oklch(0 0 0 / 0.06)';
    }}>
        {/* Thumbnail zone — external link */}
        <a href={card.externalUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'block',
        height: '180px',
        background: 'var(--sage)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none'
      }}>
          {/* Centered TSA label */}
          <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.2rem',
            color: 'white'
          }}>
              TSA
            </span>
          </div>
          {/* Bottom-left label */}
          <span style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: '0.5rem',
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.70)'
        }}>
            Ouvre dans un nouvel onglet →
          </span>
        </a>

        {/* Card body */}
        <div style={{
        padding: '1.2rem'
      }}>
          <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--sage)',
          background: 'var(--sage-tint)',
          border: '1px solid var(--ds-border)',
          borderRadius: '999px',
          padding: '0.2rem 0.6rem'
        }}>
            {card.tag}
          </span>
          <p style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.92rem',
          color: 'var(--ink)',
          marginTop: '0.5rem',
          lineHeight: 1.35,
          marginBottom: 0
        }}>
            {card.title}
          </p>
          <p style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.72rem',
          color: 'var(--ink-soft)',
          marginTop: '0.3rem',
          marginBottom: 0
        }}>
            {card.source}
          </p>
        </div>
      </div>;
  }

  // YouTube card
  return <div style={{
    background: 'var(--white)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--ds-border)',
    boxShadow: '0 2px 16px oklch(0 0 0 / 0.06)',
    transition: 'transform 300ms ease, box-shadow 300ms ease'
  }} onMouseEnter={e => {
    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px oklch(0 0 0 / 0.10)';
  }} onMouseLeave={e => {
    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px oklch(0 0 0 / 0.06)';
  }}>
      {/* Thumbnail zone */}
      <div style={{
      height: '180px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--ink)',
      cursor: 'pointer'
    }}>
        {playing ? <iframe src={`${card.embedUrl}?autoplay=1`} width="100%" height="180" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{
        display: 'block',
        border: 'none'
      }} /> : <div onClick={() => setPlaying(true)} style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer'
      }}>
            <img src={card.thumbnailUrl} alt={card.title} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: 0.85
        }} />
            {/* Play button */}
            <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
              <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                <span style={{
              color: 'var(--sage)',
              fontSize: '1.1rem',
              marginLeft: '3px',
              lineHeight: 1
            }}>
                  ▶
                </span>
              </div>
            </div>
          </div>}
      </div>

      {/* Card body */}
      <div style={{
      padding: '1.2rem'
    }}>
        <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--sage)',
        background: 'var(--sage-tint)',
        border: '1px solid var(--ds-border)',
        borderRadius: '999px',
        padding: '0.2rem 0.6rem'
      }}>
          {card.tag}
        </span>
        <p style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.92rem',
        color: 'var(--ink)',
        marginTop: '0.5rem',
        lineHeight: 1.35,
        marginBottom: 0
      }}>
          {card.title}
        </p>
        <p style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        fontSize: '0.72rem',
        color: 'var(--ink-soft)',
        marginTop: '0.3rem',
        marginBottom: 0
      }}>
          {card.source}
        </p>
      </div>
    </div>;
}
function RessourcesSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return <section id="ressources" ref={ref} className="section-block section-block--compact" style={{
    background: 'var(--sage-tint)',
    padding: '6rem 7vw'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Header */}
        <span className="reveal" style={{
        display: 'block',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }}>
          RESSOURCES
        </span>
        <h2 className="reveal" style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: 'var(--ink)',
        marginTop: '0.6rem',
        marginBottom: 0
      }}>
          Comprendre les troubles des apprentissages
        </h2>
        <p className="reveal" style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        fontSize: '0.9rem',
        color: 'var(--ink-soft)',
        marginTop: '0.5rem',
        marginBottom: 0
      }}>
          Des vidéos sélectionnées pour mieux comprendre ce que vivent les enfants DYS, TSA,
          TDA/H — à destination des parents et des équipes éducatives.
        </p>

        {/* Video cards grid */}
        <div className="cards-grid cards-grid--3" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginTop: '2.5rem'
      }}>
          {VIDEO_CARDS.map(vc => <div key={vc.id} className="reveal">
              <VideoCardItem card={vc} />
            </div>)}
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 6 — FORMATIONS
═══════════════════════════════════════════════════ */

function FormationsSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return <section id="formations" ref={ref} className="section-block" style={{
    background: 'var(--sage-tint)',
    padding: '7rem 7vw'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Header */}
        <span className="reveal" style={{
        display: 'block',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }}>
          FORMATIONS
        </span>
        <h2 className="reveal" style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: 'var(--ink)',
        marginTop: '0.6rem'
      }}>
          Diplômes &amp; parcours
        </h2>

        {/* Cards grid */}
        <div className="cards-grid cards-grid--3" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginTop: '3rem'
      }}>
          {DIPLOMA_CARDS.map(dip => <div key={dip.id} className="reveal" style={{
          background: 'var(--white)',
          borderRadius: '16px',
          padding: '1.8rem',
          border: '1px solid var(--ds-border)',
          borderTop: '3px solid var(--sage)',
          transition: 'transform 250ms ease, box-shadow 250ms ease',
          cursor: 'default'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px oklch(0.55 0.09 152 / 0.10)';
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}>
              <span style={{
            display: 'block',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)'
          }}>
                {dip.label}
              </span>
              <span style={{
            display: 'block',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'var(--ink)',
            marginTop: '0.5rem',
            lineHeight: 1.4
          }}>
                {dip.title}
              </span>
              <span style={{
            display: 'block',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.8rem',
            color: 'var(--sage)',
            marginTop: '0.4rem'
          }}>
                {dip.school}
              </span>
              <span style={{
            display: 'block',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.75rem',
            color: 'var(--ink-soft)',
            marginTop: '0.2rem'
          }}>
                {dip.year}
              </span>
            </div>)}
        </div>

        {/* Continuing education strip */}
        <div className="reveal" style={{
        background: 'var(--sage)',
        borderRadius: '14px',
        padding: '1.5rem 2rem',
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
          <span style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '1.1rem',
          color: 'white',
          flexShrink: 0
        }}>
            Formations continues
          </span>
          <span style={{
          width: '1px',
          height: '24px',
          background: 'rgba(255,255,255,0.30)',
          flexShrink: 0
        }} />
          <span style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.80)'
        }}>
            Canopé · Magistère · Analyse Appliquée du Comportement (ABA) · TEACCH · CAA (Makaton)
          </span>
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   SECTION 7 — CONTACT
═══════════════════════════════════════════════════ */

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function ContactForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Nouveau message — ${SITE.name}`,
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = (await response.json()) as { success?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? 'Envoi impossible. Réessayez plus tard.');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue. Vous pouvez aussi m’écrire directement par email.',
      );
    }
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'oklch(0.19 0.015 255)',
    border: '1px solid oklch(0.30 0.02 255)',
    color: 'white',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontFamily: "'Instrument Sans', sans-serif",
    fontWeight: 400,
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 180ms ease'
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--sage)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'oklch(0.30 0.02 255)';
  };
  return <form onSubmit={handleSubmit} style={{
    background: 'oklch(0.22 0.02 255)',
    borderRadius: '16px',
    padding: '2.2rem',
    border: '1px solid oklch(0.28 0.02 255)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }}>
      <h3 style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      color: 'white',
      marginBottom: '1.5rem'
    }}>
        Envoyer un message
      </h3>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      <input required type="text" placeholder="Votre nom" value={form.name} onChange={e => setForm({
      ...form,
      name: e.target.value
    })} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
      <input required type="email" placeholder="Votre email" value={form.email} onChange={e => setForm({
      ...form,
      email: e.target.value
    })} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
      <textarea required placeholder="Votre message..." rows={4} value={form.message} onChange={e => setForm({
      ...form,
      message: e.target.value
    })} style={{
      ...inputStyle,
      resize: 'none'
    }} onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>} onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>} />
      {status === 'success' ? (
        <p
          role="status"
          style={{
            margin: '0.5rem 0 0',
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '0.875rem',
            color: 'oklch(0.82 0.12 152)',
            lineHeight: 1.6,
          }}
        >
          Message envoyé. Je vous répondrai dès que possible.
        </p>
      ) : null}
      {status === 'error' ? (
        <p
          role="alert"
          style={{
            margin: '0.5rem 0 0',
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '0.875rem',
            color: 'oklch(0.78 0.14 25)',
            lineHeight: 1.6,
          }}
        >
          {errorMessage}{' '}
          <a href={`mailto:${SITE.email}`} style={{ color: 'var(--sage-dim)' }}>
            {SITE.email}
          </a>
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          background: status === 'loading' ? 'oklch(0.40 0.06 152)' : 'var(--sage)',
          color: 'white',
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '0.85rem',
          borderRadius: '8px',
          border: 'none',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          marginTop: '0.1rem',
          transition: 'background 220ms ease',
          opacity: status === 'loading' ? 0.85 : 1,
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.48 0.09 152)';
          }
        }}
        onMouseLeave={(e) => {
          if (status !== 'loading') {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--sage)';
          }
        }}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer →'}
      </button>
      <p
        style={{
          margin: '0.75rem 0 0',
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: '0.7rem',
          color: 'oklch(0.55 0.01 255)',
          lineHeight: 1.5,
        }}
      >
        Premier envoi : FormSubmit vous demandera une confirmation par email (une seule fois).
      </p>
    </form>;
}
function FaqSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-heading"
      className="section-block section-block--compact"
      style={{ background: 'var(--white)', padding: '5rem 7vw' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <span
          className="reveal"
          style={{
            display: 'block',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          QUESTIONS FRÉQUENTES
        </span>
        <h2
          id="faq-heading"
          className="reveal"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: 'var(--ink)',
            marginTop: '0.8rem',
            marginBottom: '2rem',
          }}
        >
          {SITE.name} — soutien scolaire DYS, TSA et éducation inclusive
        </h2>
        <dl style={{ margin: 0 }}>
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              className="reveal"
              style={{
                borderTop: '1px solid var(--ds-border)',
                padding: '1.25rem 0',
              }}
            >
              <dt
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {item.question}
              </dt>
              <dd
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  color: 'var(--ink-mid)',
                  lineHeight: 1.75,
                  margin: '0.5rem 0 0',
                }}
              >
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = React.useRef<HTMLElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);
  return <section id="contact" ref={ref} className="section-block" style={{
    background: 'var(--ink)',
    padding: '7rem 7vw',
    color: 'white'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        {/* Header */}
        <span className="reveal" style={{
        display: 'block',
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--sage-dim)'
      }}>
          CONTACT
        </span>
        <h2 className="reveal" style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
        color: 'white',
        lineHeight: 1.05,
        marginTop: '0.6rem'
      }}>
          Travaillons
          <br />
          ensemble.
        </h2>

        {/* Two-col layout */}
        <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
        marginTop: '3.5rem'
      }}>
          {/* Left — info */}
          <div className="reveal">
            <p style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.9rem',
            color: 'oklch(0.75 0.01 255)',
            lineHeight: 1.7,
            maxWidth: '380px',
            margin: 0
          }}>
              Contactez {SITE.name} pour du soutien scolaire individualisé, des interventions en
              établissement scolaire ou médico-social, et des collaborations pluridisciplinaires.
            </p>

            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '2.5rem'
          }}>
              {CONTACT_ITEMS.map(item => <a key={item.id} href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              textDecoration: 'none',
              color: 'inherit'
            }}>
                  <span style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'oklch(0.22 0.02 255)',
                border: '1px solid oklch(0.30 0.02 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0
              }}>
                    {item.icon}
                  </span>
                  <span style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.05rem'
              }}>
                    <span style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--sage-dim)'
                }}>
                      {item.label}
                    </span>
                    <span style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: 'white',
                  transition: 'color 150ms ease'
                }} onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--sage-dim)'} onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'white'}>
                      {item.value}
                    </span>
                  </span>
                </a>)}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>;
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */

function SiteFooter() {
  return <footer className="site-footer" style={{
    background: 'var(--ink)',
    borderTop: '1px solid oklch(0.26 0.02 255)',
    padding: '1.8rem 7vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem'
  }}>
      <span style={{
      fontFamily: "'Fraunces', serif",
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: '0.9rem',
      color: 'oklch(0.50 0.01 255)'
    }}>
        {SITE.brand}
      </span>
      <span style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 400,
      fontSize: '0.75rem',
      color: 'oklch(0.40 0.01 255)'
    }}>
        © {new Date().getFullYear()} {SITE.name} · {SITE.email}
      </span>
    </footer>;
}

/* ═══════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════ */

export function ShowcaseWebsite() {
  return <div style={{
    width: '100%',
    minHeight: '100vh',
    background: 'var(--parchment)'
  }}>
      <Seo />
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 10000,
          padding: '0.75rem 1.25rem',
          background: 'var(--sage)',
          color: 'white',
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          textDecoration: 'none',
          borderRadius: '0 0 8px 0',
        }}
        onFocus={(e) => {
          const el = e.currentTarget;
          el.style.left = '0';
          el.style.width = 'auto';
          el.style.height = 'auto';
        }}
        onBlur={(e) => {
          const el = e.currentTarget;
          el.style.left = '-9999px';
          el.style.width = '1px';
          el.style.height = '1px';
        }}
      >
        Aller au contenu principal
      </a>
      <StickyHeader />
      <main id="main-content" role="main" aria-label={`${SITE.name} — ${SITE.tagline}`}>
        <HeroSection />
        <AboutSection />
        <EnImagesSection />
        <ExpertiseSection />
        <RessourcesSection />
        <FormationsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>;
}