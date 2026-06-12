import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Boutique', href: '#produits' },
  { label: 'Bouquets', href: '#bouquets' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Passive scroll listener for performance
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            {/* Logo */}
            <a href="#accueil" className="flex flex-col leading-none">
              <span
                className={`font-serif text-[1.45rem] font-medium tracking-tight transition-colors duration-500 ${
                  scrolled ? 'text-[#B71C1C]' : 'text-white'
                }`}
              >
                Rose Élégance
              </span>
              <span
                className={`text-[0.52rem] tracking-[0.38em] uppercase font-medium mt-0.5 transition-colors duration-500 ${
                  scrolled ? 'text-gray-400' : 'text-white/50'
                }`}
              >
                Fleuriste Premium
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-9">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    scrolled ? 'text-gray-700 hover:text-[#B71C1C]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px bg-[#B71C1C] w-0 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Right zone */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+33123456789"
                className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                  scrolled ? 'text-gray-500 hover:text-[#B71C1C]' : 'text-white/60 hover:text-white'
                }`}
              >
                <Phone size={14} />
                <span>01 23 45 67 89</span>
              </a>
              <a
                href="#contact"
                className="bg-[#B71C1C] hover:bg-[#D32F2F] text-white text-[0.7rem] font-medium tracking-[0.22em] uppercase px-7 py-3.5 transition-colors duration-300 hover:shadow-lg hover:shadow-red-900/20"
              >
                Commander
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden p-1"
              aria-label="Menu navigation"
            >
              {menuOpen ? (
                <X size={22} className={scrolled ? 'text-gray-800' : 'text-white'} />
              ) : (
                <Menu size={22} className={scrolled ? 'text-gray-800' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-serif text-xl text-[#B71C1C]">Rose Élégance</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer">
                <X size={20} className="text-gray-500 hover:text-gray-800 transition-colors" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-5 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.065 }}
                  className="py-4 border-b border-gray-50 text-gray-800 font-medium text-sm hover:text-[#B71C1C] transition-colors flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-gray-300">›</span>
                </motion.a>
              ))}
            </nav>
            <div className="p-6 space-y-3 border-t border-gray-100">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block bg-[#B71C1C] hover:bg-[#D32F2F] text-white text-center py-3.5 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors"
              >
                Commander
              </a>
              <a
                href="tel:+33123456789"
                className="flex items-center justify-center gap-2 text-gray-500 text-sm hover:text-[#B71C1C] transition-colors"
              >
                <Phone size={14} />
                01 23 45 67 89
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
