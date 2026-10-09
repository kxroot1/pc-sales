import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Instagram,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
  Facebook,
} from 'lucide-react'
import { Header, Brand } from './components/Header'
import { HeroScene } from './components/HeroScene'
import { Catalog } from './components/Catalog'
import { EnquiryForm } from './components/EnquiryForm'
import { ProductArt } from './components/ProductArt'
import { business } from './config/business'
import { safeSocialUrl } from './lib/enquiry'

const services = [
  {
    icon: HeartHandshake,
    number: '01',
    title: 'Find your kind of tech.',
    text: 'Student, creator, or everyday multitasker? Start with what you need. We’ll help you explore your options.',
  },
  {
    icon: Wrench,
    number: '02',
    title: 'Get off to a good start.',
    text: 'Have a setup question? Ask about getting your workspace, new computer, and accessories working together.',
  },
  {
    icon: MessageCircle,
    number: '03',
    title: 'Keep the conversation going.',
    text: 'No question is too small. A simple WhatsApp message is all it takes to talk through your next step.',
  },
]

export default function App() {
  const [selection, setSelection] = useState<{ name: string; version: number } | null>(null)

  function enquire(name: string) {
    setSelection((previous) => ({ name, version: (previous?.version ?? 0) + 1 }))
    document.getElementById('contact')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  const socials = [
    { name: 'Instagram', icon: Instagram, url: safeSocialUrl(business.socialLinks.instagram) },
    { name: 'Facebook', icon: Facebook, url: safeSocialUrl(business.socialLinks.facebook) },
  ]

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> YOUR LOCAL TECH SPOT, IN {business.country.toUpperCase()}
            </p>
            <h1 id="hero-title">
              Good tech.
              <br />
              Better{' '}
              <span className="hero-word">
                everydays
                <svg viewBox="0 0 430 23" aria-hidden="true">
                  <path
                    d="M4 17c102-20 258-16 419-8M54 21C163 7 272 4 382 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-description">
              For the work you do, the things you make,
              <br className="desktop-break" /> and the life in between. Find tech that fits you.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="button button-dark">
                Find your next essential <ArrowUpRight size={19} />
              </a>
              <button className="hero-help" onClick={() => enquire('General advice')}>
                Help me choose <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-footnote">
              <span className="small-spark">
                <Sparkles size={16} />
              </span>
              <span>
                A small shop. A thoughtful selection.
                <br />
                <strong>A little more human.</strong>
              </span>
            </div>
          </div>
          <HeroScene />
        </section>
        <div className="benefits-strip">
          <div className="container benefits-inner">
            <p>
              <HeartHandshake size={21} />
              <span>Advice that makes sense</span>
            </p>
            <span className="benefit-divider" />
            <p>
              <PackageCheck size={21} />
              <span>Essentials, thoughtfully chosen</span>
            </p>
            <span className="benefit-divider" />
            <p>
              <MessageCircle size={21} />
              <span>Let’s connect on WhatsApp</span>
            </p>
            <span className="benefit-divider" />
            <p>
              <MapPin size={21} />
              <span>A local touch, in {business.country}</span>
            </p>
          </div>
        </div>
        <Catalog onEnquire={enquire} />
        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="container about-layout">
            <div
              className="about-art"
              role="img"
              aria-label="Original illustration of a calm workspace with a monitor, keyboard, and a small plant"
            >
              <div className="about-art-label">
                <span /> ROOM FOR WHAT MATTERS
              </div>
              <div className="desk-art">
                <ProductArt kind="monitor" color="#405b4c" />
                <div className="desk-keyboard">
                  <ProductArt kind="keyboard" color="#e3e5d8" />
                </div>
                <div className="plant">
                  <span className="leaf leaf-one" />
                  <span className="leaf leaf-two" />
                  <span className="leaf leaf-three" />
                  <span className="plant-stem" />
                  <span className="plant-pot" />
                </div>
                <div className="desk-line" />
              </div>
              <span className="about-art-caption">Your space. Your pace.</span>
              <div className="about-art-sticker">
                <HeartHandshake size={25} />
                <span>
                  TECH WITH
                  <br />
                  <strong>A HUMAN TOUCH</strong>
                </span>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">
                <span /> A LITTLE ABOUT {business.name.toUpperCase()}
              </p>
              <h2 id="about-title">
                Big on possibilities.
                <br />
                Small on complications.
              </h2>
              <p>
                Tech should make your day easier. That’s the idea behind {business.name} — a
                fictional neighbourhood shop built around good tools and easy conversations.
              </p>
              <p>
                From a first laptop to a fresh desk setup, this demo imagines a more personal way to
                find your fit. No endless aisles. Just a considered collection and a friendly place
                to start.
              </p>
              <a href="#contact" className="text-link">
                Get to know us <ArrowUpRight size={18} />
              </a>
              <div className="about-values">
                <span>
                  <Check size={16} /> Thoughtfully selected
                </span>
                <span>
                  <Check size={16} /> Locally minded
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="services-section section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span /> MORE THAN A BOX
                </p>
                <h2 id="services-title">A little help goes a long way.</h2>
              </div>
              <p>
                Before you choose. While you set up.
                <br />
                Whenever you have a question.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-top">
                    <span className="service-icon">
                      <service.icon size={24} strokeWidth={1.6} />
                    </span>
                    <span>{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button className="text-link" onClick={() => enquire('General advice')}>
                    Let’s talk <ArrowUpRight size={17} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="faq-section container" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">
              <span /> GOOD QUESTIONS
            </p>
            <h2 id="faq-title">
              A few things
              <br />
              you might wonder.
            </h2>
          </div>
          <div className="faq-list">
            {[
              {
                question: 'Can you help me choose my first laptop?',
                answer:
                  'Absolutely — start with “A little help choosing” in the enquiry form. Tell us how you plan to use your laptop and your budget in MAD. The demo prepares a WhatsApp message for a conversation, without placing an order.',
              },
              {
                question: 'Are these real products and prices?',
                answer:
                  'This is a fictional shop demo. Every product name, specification, and MAD price is illustrative. For a real shop, replace the catalogue with actual stock and confirm current prices and availability before purchasing.',
              },
              {
                question: 'How do I ask about pickup or delivery?',
                answer:
                  'Include your preferred pickup or delivery option in your enquiry. A real business can confirm its options and any costs over WhatsApp after its number is configured. This demo does not book deliveries or accept payments.',
              },
            ].map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <ChevronDown size={20} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">
                <span /> YOUR NEXT GOOD DAY STARTS HERE
              </p>
              <h2 id="contact-title">
                Let’s find
                <br />
                your kind of tech<span>.</span>
              </h2>
              <p>
                Got a question, a budget, or a big idea?
                <br />
                We’re a conversation away.
              </p>
              <div className="contact-details">
                <div>
                  <MapPin size={20} />
                  <div>
                    <h3>Come say hello</h3>
                    <p>
                      {business.address.startsWith('YOUR_')
                        ? 'Address to be configured'
                        : business.address}
                    </p>
                  </div>
                </div>
                <div>
                  <Clock3 size={20} />
                  <div>
                    <h3>Make time for a visit</h3>
                    <p>
                      {business.openingHours.startsWith('YOUR_')
                        ? 'Opening hours to be configured'
                        : business.openingHours}
                    </p>
                  </div>
                </div>
                <div>
                  <MessageCircle size={20} />
                  <div>
                    <h3>Or keep it simple</h3>
                    <p>Prepare an enquiry on WhatsApp</p>
                  </div>
                </div>
              </div>
              <div className="contact-note">
                <ShieldCheck size={20} />
                <p>
                  A conversation, not a commitment.
                  <br />
                  Ask about pricing and availability first.
                </p>
              </div>
            </div>
            <EnquiryForm selection={selection} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand />
              <p>{business.tagline}</p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="#collection">The collection</a>
              <a href="#about">About us</a>
              <a href="#contact">Let’s connect</a>
            </nav>
            <div className="social-links">
              {socials.map((social) =>
                social.url ? (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={`${social.name} (opens in new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={19} />
                  </a>
                ) : (
                  <span
                    key={social.name}
                    role="img"
                    className="social-placeholder"
                    title={`${social.name} link is not configured`}
                    aria-label={`${social.name}: not configured`}
                  >
                    <social.icon size={19} />
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {business.name}. A fictional business demo.
            </span>
            <span>Original illustrations. Sample products & prices in MAD.</span>
            <a href="#top">
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
