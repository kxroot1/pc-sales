import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { business } from '../config/business'

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand${inverse ? ' brand-inverse' : ''}`}
      aria-label={`${business.name}, back to top`}
    >
      <span className="brand-symbol" aria-hidden="true">
        {business.name.charAt(0).toLowerCase()}
        <span />
      </span>
      <span>
        {business.name.toLowerCase().replace(/\s+/g, '')}
        <span className="brand-period">.</span>
      </span>
    </a>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <div className="announcement">
        <span>Good tech for wherever life takes you.</span>
        <span>
          {business.country} <span aria-hidden="true">↗</span>
          <span className="announcement-demo">Fictional shop demo</span>
        </span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#collection">The collection</a>
            <a href="#about">A little about us</a>
            <a href="#contact">Visit & connect</a>
          </nav>
          <a className="header-cta" href="#contact">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav container"
            aria-label="Mobile navigation"
          >
            <a href="#collection" onClick={close}>
              The collection <ArrowUpRight size={18} />
            </a>
            <a href="#about" onClick={close}>
              A little about us <ArrowUpRight size={18} />
            </a>
            <a href="#contact" onClick={close}>
              Visit & connect <ArrowUpRight size={18} />
            </a>
          </nav>
        )}
      </header>
    </>
  )
}
