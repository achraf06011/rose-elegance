import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Twitter, Youtube, Send, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Accueil',     target: null },
  { label: 'Collections', target: 'collections' },
  { label: 'Bouquets',    target: 'bouquets' },
  { label: 'Services',    target: 'services' },
  { label: 'Contact',     target: 'contact' },
]

const scrollTo = target =>
  target
    ? document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    : window.scrollTo({ top: 0, behavior: 'smooth' })

const services = [
  'Mariages & Cérémonies',
  'Anniversaires',
  'Événements corporatifs',
  'Décoration florale',
  'Livraison express',
  'Abonnements floraux',
]

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'Youtube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNewsletter = e => {
    e.preventDefault()
    if (email.includes('@')) { setSubscribed(true); setEmail('') }
  }

  return (
    <>
      <footer className="bg-[#0F0C09] text-white">
        {/* Main */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-5">
                <div className="font-serif text-white text-xl mb-1">Rose Élégance</div>
                <div className="text-[0.48rem] tracking-[0.48em] text-[#B8922A] uppercase">Fleuriste Premium</div>
              </div>
              <p className="text-white/30 text-sm font-light leading-relaxed mb-7">
                Depuis 2008, nous créons des bouquets artisanaux et des compositions florales qui émeuvent et enchantent.
              </p>
              <div className="flex gap-2.5">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 border border-white/[0.08] hover:border-[#9B1B30]/60 hover:bg-[#9B1B30]/10 flex items-center justify-center transition-all duration-300 group"
                  >
                    <s.Icon size={14} className="text-white/30 group-hover:text-white/70 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[0.57rem] font-medium tracking-[0.45em] uppercase text-white/30 mb-6">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.target)}
                      className="text-white/35 text-sm font-light hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#9B1B30] transition-all duration-300 flex-shrink-0" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[0.57rem] font-medium tracking-[0.45em] uppercase text-white/30 mb-6">Services</h4>
              <ul className="flex flex-col gap-3">
                {services.map(s => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-white/35 text-sm font-light hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#9B1B30] transition-all duration-300 flex-shrink-0" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter */}
            <div>
              <h4 className="text-[0.57rem] font-medium tracking-[0.45em] uppercase text-white/30 mb-6">Contact</h4>
              <div className="flex flex-col gap-3.5 mb-8">
                {[
                  { Icon: MapPin, val: '24, Rue des Fleurs, 75008 Paris' },
                  { Icon: Phone, val: '01 23 45 67 89', href: 'tel:+33123456789' },
                  { Icon: Mail, val: 'contact@rose-elegance.fr', href: 'mailto:contact@rose-elegance.fr' },
                  { Icon: Clock, val: 'Lun – Sam : 8h30 – 19h30' },
                ].map(({ Icon, val, href }, i) => (
                  <div key={i} className="flex gap-3 text-sm text-white/30">
                    <Icon size={13} className="text-[#9B1B30] mt-0.5 flex-shrink-0" />
                    {href
                      ? <a href={href} className="hover:text-white/70 transition-colors">{val}</a>
                      : <span>{val}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-[0.55rem] tracking-[0.4em] uppercase text-white/25 mb-3">Newsletter</p>
                {subscribed ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400/80 text-sm">
                    Merci pour votre inscription !
                  </motion.p>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#9B1B30]/60 transition-colors duration-200 min-w-0"
                    />
                    <button
                      type="submit"
                      className="bg-[#9B1B30] hover:bg-[#B8202E] px-4 py-2.5 transition-colors duration-300 flex-shrink-0"
                      aria-label="S'abonner"
                    >
                      <Send size={13} className="text-white" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Rose Élégance. Tous droits réservés.
            </p>
            <div className="flex gap-6 items-center">
              {['Mentions légales', 'Confidentialité', 'CGV'].map(l => (
                <a key={l} href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors">{l}</a>
              ))}
              <Link
                to="/admin"
                className="text-white/10 text-xs hover:text-white/35 transition-colors duration-300 border-l border-white/[0.06] pl-6"
              >
                Administration
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top — only visible after scroll */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-11 h-11 bg-[#9B1B30] hover:bg-[#B8202E] text-white flex items-center justify-center shadow-lg shadow-[#9B1B30]/30 transition-colors duration-300 z-30"
            aria-label="Retour en haut"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
