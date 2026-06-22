import { motion } from 'framer-motion'

const categories = [
  { name: 'Roses',           sub: '48 créations', num: '01' },
  { name: 'Bouquets',        sub: '64 créations', num: '02' },
  { name: 'Tulipes',         sub: '32 créations', num: '03' },
  { name: 'Tournesols',      sub: '24 créations', num: '04' },
  { name: 'Fleurs de saison',sub: '56 créations', num: '05' },
  { name: 'Cadeaux floraux', sub: '18 créations', num: '06' },
]

export default function Collections() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-[#FDFAF6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-5">
              01 — Nos Collections
            </span>
            <h2 className="font-serif text-[#0F0C09] text-[clamp(2.8rem,6vw,6.5rem)] leading-[0.9]">
              Explorez<br />
              <span className="italic">l'univers floral</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-[#0F0C09]/40 text-sm font-light leading-relaxed max-w-[260px] lg:mb-2"
          >
            Chaque fleur est sélectionnée avec soin pour vous offrir la plus belle des expériences florales.
          </motion.p>
        </div>

        {/* Editorial list — no photos */}
        <div className="border-t border-[#0F0C09]/[0.08]">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#bouquets"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center justify-between py-5 sm:py-7 border-b border-[#0F0C09]/[0.08] hover:border-[#9B1B30]/30 transition-all duration-300 cursor-pointer"
            >
              {/* Left: number + name */}
              <div className="flex items-baseline gap-5 sm:gap-9">
                <span className="font-serif text-[#0F0C09]/[0.16] text-sm tracking-[0.2em] group-hover:text-[#9B1B30]/35 transition-colors duration-300 flex-shrink-0">
                  {cat.num}
                </span>
                <h3 className="font-serif text-[#0F0C09] text-[clamp(1.6rem,3.8vw,3.2rem)] leading-none group-hover:translate-x-2 transition-transform duration-400">
                  {cat.name}
                </h3>
              </div>

              {/* Right: count + arrow */}
              <div className="flex items-center gap-5 sm:gap-8 flex-shrink-0">
                <span className="text-[#0F0C09]/28 text-xs font-light hidden sm:block tracking-wide">
                  {cat.sub}
                </span>
                <span className="text-[#0F0C09]/20 group-hover:text-[#9B1B30] transition-colors duration-300 text-xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
