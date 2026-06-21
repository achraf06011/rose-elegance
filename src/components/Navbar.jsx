import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Collections', href: '#collections' },
  { label: 'Bouquets', href: '#bouquets' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0F0C09]/95 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>

            {/* Logo */}
            <a href="#accueil" className="flex flex-col leading-none">
              <span className="font-serif text-[1.25rem] text-white tracking-tight">Rose Élégance</span>
              <span className="text-[0.48rem] tracking-[0.48em] uppercase text-[#B8922A] mt-0.5">Fleuriste Premium</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/55 hover:text-white text-[0.78rem] font-light tracking-wide transition-colors duration-300 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full bg-[#B8922A] transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+33123456789"
                className="flex items-center gap-2 text-white/35 hover:text-white/70 text-xs transition-colors duration-300"
              >
                <Phone size={11} />
                01 23 45 67 89
              </a>
              <a
                href="#contact"
                className="bg-[#9B1B30] hover:bg-[#B8202E] text-white text-[0.58rem] tracking-[0.32em] uppercase px-6 py-3 transition-colors duration-300"
              >
                Commander
              </a>
            </div>

            {/* Hamburger */}
            <button onClick={() => setOpen(v => !v)} className="lg:hidden text-white p-1">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#0F0C09] border-l border-white/[0.08] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <span className="font-serif text-white text-lg">Rose Élégance</span>
              <button onClick={() => setOpen(false)}>
                <X size={18} className="text-white/40 hover:text-white transition-colors" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-4 flex-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="py-4 border-b border-white/[0.06] text-white/55 hover:text-white text-sm font-light transition-colors duration-200"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-6 border-t border-white/[0.08]">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block bg-[#9B1B30] hover:bg-[#B8202E] text-white text-center py-3.5 text-[0.6rem] tracking-[0.32em] uppercase transition-colors"
              >
                Commander
              </a>
              <a
                href="tel:+33123456789"
                className="flex items-center justify-center gap-2 mt-3 text-white/35 text-xs hover:text-white/60 transition-colors"
              >
                <Phone size={11} /> 01 23 45 67 89
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
