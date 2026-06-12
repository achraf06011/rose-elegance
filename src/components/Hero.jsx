import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const stats = [
  { number: '15+', label: "Années d'expérience" },
  { number: '2 400+', label: 'Clients satisfaits' },
  { number: '98 %', label: 'Livraisons à temps' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.65], ['0%', '12%'])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.5 } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section ref={containerRef} id="accueil" className="relative h-screen min-h-[680px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.18]">
        <img
          src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1920&q=85"
          alt="Roses rouges — Rose Élégance fleuriste"
          className="w-full h-full object-cover"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 w-full pb-20 sm:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-7">
              <div className="w-14 h-px bg-[#B71C1C]" />
              <span className="text-white/60 text-[0.65rem] tracking-[0.38em] uppercase font-medium">
                Fleuriste Artisanal depuis 2008
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-6xl lg:text-[5.2rem] text-white leading-[1.05] mb-7"
            >
              Chaque fleur<br />
              <span className="italic text-[#F8BBD0]">raconte</span> une<br />
              émotion
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg"
            >
              Découvrez nos bouquets artisanaux, compositions florales et créations sur mesure pour tous vos événements.
            </motion.p>

            {/* CTA — use CSS hover only, Framer Motion for scale only */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#bouquets"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="bg-[#B71C1C] hover:bg-[#D32F2F] text-white text-[0.7rem] font-medium tracking-[0.22em] uppercase px-9 py-4 transition-colors duration-300 inline-block"
              >
                Découvrir les bouquets
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="border border-white/65 hover:border-white hover:bg-white hover:text-[#1F2937] text-white text-[0.7rem] font-medium tracking-[0.22em] uppercase px-9 py-4 transition-all duration-300 inline-block"
              >
                Commander maintenant
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/12"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 divide-x divide-white/12">
            {stats.map(s => (
              <div key={s.label} className="py-4 sm:py-5 px-3 sm:px-8 text-center">
                <div className="font-serif text-xl sm:text-3xl text-white mb-0.5">{s.number}</div>
                <div className="text-white/45 text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute right-7 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 text-white/38"
      >
        <span
          className="text-[0.58rem] tracking-[0.32em] uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Défiler
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
