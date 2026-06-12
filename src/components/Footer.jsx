import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Twitter, Youtube, Send, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Boutique', href: '#produits' },
  { label: 'Bouquets', href: '#bouquets' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

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

  // Show back-to-top button only after scrolling down 500px
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNewsletter = e => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <>
      <footer id="footer" className="bg-[#1F2937] text-white">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="font-serif text-2xl text-white mb-1">Rose Élégance</div>
                <div className="text-[0.55rem] tracking-[0.38em] text-gray-500 uppercase">Fleuriste Premium</div>
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-7">
                Depuis 2008, nous créons des bouquets artisanaux et des compositions florales qui émeuvent et enchantent. L'art floral au service de vos émotions.
              </p>
              {/* Socials */}
              <div className="flex gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 border border-gray-700 hover:border-[#B71C1C] hover:bg-[#B71C1C]/10 flex items-center justify-center transition-all duration-300 group"
                  >
                    <s.Icon size={15} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-gray-400 mb-6">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#B71C1C] transition-all duration-300 flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-gray-400 mb-6">Services</h4>
              <ul className="flex flex-col gap-3">
                {services.map(s => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#B71C1C] transition-all duration-300 flex-shrink-0" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter */}
            <div>
              <h4 className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-gray-400 mb-6">Contact & Horaires</h4>
              <div className="flex flex-col gap-3.5 mb-8">
                <div className="flex gap-3 text-sm text-gray-400">
                  <MapPin size={14} className="text-[#B71C1C] mt-0.5 flex-shrink-0" />
                  <span>24, Rue des Fleurs, 75008 Paris</span>
                </div>
                <div className="flex gap-3 text-sm text-gray-400">
                  <Phone size={14} className="text-[#B71C1C] mt-0.5 flex-shrink-0" />
                  <a href="tel:+33123456789" className="hover:text-white transition-colors">01 23 45 67 89</a>
                </div>
                <div className="flex gap-3 text-sm text-gray-400">
                  <Mail size={14} className="text-[#B71C1C] mt-0.5 flex-shrink-0" />
                  <a href="mailto:contact@rose-elegance.fr" className="hover:text-white transition-colors">
                    contact@rose-elegance.fr
                  </a>
                </div>
                <div className="flex gap-3 text-sm text-gray-400">
                  <Clock size={14} className="text-[#B71C1C] mt-0.5 flex-shrink-0" />
                  <span>Lun – Sam : 8h30 – 19h30<br />Dimanche : 9h – 13h</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-[0.65rem] font-medium tracking-[0.28em] uppercase text-gray-400 mb-3">Newsletter</p>
                {subscribed ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-sm"
                  >
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
                      className="flex-1 bg-white/[0.06] border border-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#B71C1C] transition-colors duration-200 min-w-0"
                    />
                    <button
                      type="submit"
                      className="bg-[#B71C1C] px-4 py-2.5 hover:bg-[#D32F2F] transition-colors duration-300 flex-shrink-0"
                      aria-label="S'abonner"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                )}
                <p className="text-gray-600 text-xs mt-2">Offres exclusives, nouveautés & inspirations florales.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Rose Élégance. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Mentions légales</a>
              <a href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Politique de confidentialité</a>
              <a href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top — appears only after scrolling 500px */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#accueil"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-11 h-11 bg-[#B71C1C] text-white flex items-center justify-center shadow-lg shadow-red-900/40 hover:bg-[#D32F2F] transition-colors duration-300 z-30"
            aria-label="Retour en haut"
          >
            <ArrowUp size={17} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
