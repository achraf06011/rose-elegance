import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.18]">
        <img
          src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1600&q=80"
          alt="Roses — Rose Élégance"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#0F0C09]/75" />
        <div className="absolute inset-0 bg-[#9B1B30]/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-6">
            Votre occasion, notre passion
          </span>
          <h2 className="font-serif text-white text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] mb-8">
            Chaque fleur<br />
            <span className="italic text-[#E8CFC8]">mérite</span><br />
            d'être parfaite
          </h2>
          <p className="text-white/45 text-base lg:text-lg font-light leading-relaxed mb-10 max-w-md">
            Contactez notre équipe pour une création florale sur mesure. Nous réalisons votre vision avec soin et élégance.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.18 }}
              className="bg-white hover:bg-[#FDFAF6] text-[#9B1B30] text-[0.6rem] tracking-[0.35em] uppercase font-medium px-9 py-4 transition-colors duration-300"
            >
              Commander maintenant
            </motion.a>
            <motion.a
              href="tel:+33123456789"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.18 }}
              className="border border-white/25 hover:border-white/55 text-white text-[0.6rem] tracking-[0.35em] uppercase font-medium px-9 py-4 transition-colors duration-300"
            >
              Nous appeler
            </motion.a>
          </div>
        </motion.div>

        {/* Decorative line right */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
          className="absolute right-12 top-0 bottom-0 w-px bg-white/[0.06] hidden lg:block"
        />
      </div>
    </section>
  )
}
