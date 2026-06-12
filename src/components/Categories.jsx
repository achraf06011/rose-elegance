import { motion } from 'framer-motion'
import { Heart, Sparkles, Leaf, Sun, Star, Gift } from 'lucide-react'

const categories = [
  {
    Icon: Heart,
    name: 'Roses',
    count: '48 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=550&q=72',
  },
  {
    Icon: Sparkles,
    name: 'Bouquets',
    count: '64 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=550&q=72',
  },
  {
    Icon: Leaf,
    name: 'Tulipes',
    count: '32 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=550&q=72',
  },
  {
    Icon: Sun,
    name: 'Tournesols',
    count: '24 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=550&q=72',
  },
  {
    Icon: Star,
    name: 'Fleurs de saison',
    count: '56 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1490750967868-88df5691cc16?auto=format&fit=crop&w=550&q=72',
  },
  {
    Icon: Gift,
    name: 'Cadeaux floraux',
    count: '18 créations',
    href: '#bouquets',
    image:
      'https://images.unsplash.com/photo-1494336877155-7fb9c6984f0a?auto=format&fit=crop&w=550&q=72',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Categories() {
  return (
    <section id="produits" className="py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#B71C1C]" />
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Nos Collections</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">
            Explorez nos catégories
          </h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Chaque fleur est sélectionnée avec soin pour vous offrir la plus belle des expériences florales.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group relative overflow-hidden block cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-60 md:h-72 overflow-hidden">
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.09 }}
                  transition={{ duration: 0.65 }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#B71C1C]/0 group-hover:bg-[#B71C1C]/15 transition-colors duration-500" />
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <cat.Icon
                  size={22}
                  className="text-white/60 mb-2 group-hover:text-white transition-colors duration-300"
                />
                <h3 className="font-serif text-lg sm:text-xl text-white mb-0.5">{cat.name}</h3>
                <p className="text-white/50 text-xs font-light tracking-wide">{cat.count}</p>
              </div>

              {/* Top-right arrow indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
