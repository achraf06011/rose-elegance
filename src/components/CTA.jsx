import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=75"
          alt="Roses élégantes"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#B71C1C]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-white/40" />
            <span className="text-white/65 text-[0.62rem] tracking-[0.38em] uppercase font-medium">
              Rose Élégance
            </span>
            <div className="w-12 h-px bg-white/40" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
            Offrez des émotions avec nos créations florales
          </h2>

          <p className="text-white/70 text-base sm:text-lg font-light max-w-lg leading-relaxed">
            Chaque bouquet est une histoire. Laissez-nous écrire la vôtre avec des fleurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, backgroundColor: '#fff' }}
              whileTap={{ scale: 0.96 }}
              className="group bg-white text-[#B71C1C] text-xs font-medium tracking-[0.22em] uppercase px-10 py-4 flex items-center justify-center gap-3 transition-colors duration-300"
            >
              Commander maintenant
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="tel:+33123456789"
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,1)' }}
              whileTap={{ scale: 0.96 }}
              className="border border-white/50 text-white text-xs font-medium tracking-[0.22em] uppercase px-10 py-4 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            >
              Nous appeler
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
