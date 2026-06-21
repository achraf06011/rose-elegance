import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Roses',
    sub: '48 créations',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Bouquets',
    sub: '64 créations',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Tulipes',
    sub: '32 créations',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Tournesols',
    sub: '24 créations',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Fleurs de saison',
    sub: '56 créations',
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc16?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Cadeaux floraux',
    sub: '18 créations',
    image: 'https://images.unsplash.com/photo-1494336877155-7fb9c6984f0a?auto=format&fit=crop&w=600&q=75',
  },
]

export default function Collections() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-[#FDFAF6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header — editorial left-aligned with right text */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-18 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-[#0F0C09]/45 text-sm font-light leading-relaxed max-w-[260px] lg:mb-2"
          >
            Chaque fleur est sélectionnée avec soin pour vous offrir la plus belle des expériences florales.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#bouquets"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden cursor-pointer aspect-[3/4] block"
            >
              {/* Image with CSS scale */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                loading="lazy"
                decoding="async"
              />

              {/* Permanent gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C09]/80 via-[#0F0C09]/15 to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-[#9B1B30]/0 group-hover:bg-[#9B1B30]/18 transition-colors duration-500" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="text-[#B8922A] text-[0.48rem] tracking-[0.48em] uppercase mb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {cat.sub}
                </div>
                <h3 className="font-serif text-white text-lg sm:text-xl">{cat.name}</h3>
              </div>

              {/* Top right arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <div className="w-7 h-7 border border-white/40 flex items-center justify-center">
                  <span className="text-white text-xs">›</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
