import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { n: '15+', l: 'Années' },
  { n: '2 400+', l: 'Clients' },
  { n: '98 %', l: 'Satisfaits' },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} id="accueil" className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* LEFT — dark panel */}
      <motion.div
        style={{ opacity }}
        className="w-full lg:w-[52%] bg-[#0F0C09] flex flex-col justify-center
          px-8 sm:px-14 lg:px-20 pt-32 pb-24 lg:pb-28 relative z-10 min-h-[60vh] lg:min-h-screen"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-[#B8922A]" />
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase">
            Paris · Artisanal · 2008
          </span>
        </motion.div>

        {/* Giant heading */}
        <h1 className="font-serif leading-[0.88] mb-8 select-none">
          <motion.span
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block text-white text-[clamp(4.2rem,8.5vw,10rem)]"
          >
            L'Art
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-[#E8CFC8] text-[clamp(4.2rem,8.5vw,10rem)]"
          >
            Floral
          </motion.span>
        </h1>

        {/* Gold separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-14 h-px bg-[#B8922A] mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.85 }}
          className="text-white/45 text-base lg:text-lg font-light leading-relaxed max-w-[320px] mb-10"
        >
          Des créations florales artisanales qui expriment les émotions les plus délicates.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.8 }}
          className="flex flex-wrap gap-3"
        >
          <motion.a
            href="#collections"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.18 }}
            className="bg-[#9B1B30] hover:bg-[#B8202E] text-white text-[0.6rem] tracking-[0.35em] uppercase font-medium px-8 py-4 transition-colors duration-300"
          >
            Découvrir
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.18 }}
            className="border border-white/20 hover:border-white/55 text-white text-[0.6rem] tracking-[0.35em] uppercase font-medium px-8 py-4 transition-colors duration-300"
          >
            Commander
          </motion.a>
        </motion.div>

        {/* Stats band at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.9 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/[0.07] px-8 sm:px-14 lg:px-20"
        >
          <div className="flex">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`py-5 flex-1 ${i > 0 ? 'border-l border-white/[0.07] pl-5 sm:pl-7' : ''}`}
              >
                <div className="font-serif text-white text-xl sm:text-2xl leading-none">{s.n}</div>
                <div className="text-white/28 text-[0.55rem] tracking-[0.3em] uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT — image */}
      <div className="w-full lg:w-[48%] relative overflow-hidden min-h-[55vw] lg:min-h-screen">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.14]">
          <img
            src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=85"
            alt="Roses rouges — Rose Élégance fleuriste Paris"
            className="w-full h-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C09]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0C09]/30 via-transparent to-transparent lg:from-[#0F0C09]/20" />
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-10 left-8 bg-white p-5 shadow-2xl max-w-[210px]"
        >
          <div className="text-[#B8922A] text-[0.48rem] tracking-[0.48em] uppercase mb-2">Exclusivité</div>
          <div className="font-serif text-[#0F0C09] text-[1.05rem] leading-tight">Collection Printemps 2025</div>
          <div className="flex items-center gap-2 mt-3.5">
            <div className="w-5 h-px bg-[#9B1B30]" />
            <span className="text-[#9B1B30] text-[0.5rem] tracking-widest uppercase">Disponible</span>
          </div>
        </motion.div>

        {/* Vertical scroll hint */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-10 bg-white/20" />
          <span
            className="text-white/22 text-[0.48rem] tracking-[0.45em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Défiler
          </span>
        </div>
      </div>
    </section>
  )
}
