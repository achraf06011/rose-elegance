import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'

const bouquets = [
  {
    id: 1,
    name: 'Éclat de Roses',
    desc: 'Roses de Damask & pivoines',
    price: '89',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 2,
    name: 'Nuage Blanc',
    desc: 'Roses blanches & muguet',
    price: '72',
    badge: null,
    image: 'https://images.unsplash.com/photo-1775138386053-5766c8c10e85?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 3,
    name: "Soleil d’Or",
    desc: 'Tournesols & chrysanthèmes',
    price: '55',
    badge: 'Nouveau',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 4,
    name: 'Poésie Rose',
    desc: 'Tulipes & pivoines',
    price: '68',
    badge: null,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 5,
    name: 'Romance Florale',
    desc: 'Mélange de roses sauvages',
    price: '95',
    badge: 'Exclusif',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 6,
    name: 'Jardin Secret',
    desc: 'Bouquet champêtre de saison',
    price: '62',
    badge: null,
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 7,
    name: 'Bouquet Prestige',
    desc: 'Roses dorées & amaryllis',
    price: '125',
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1719238899351-d1e049172e97?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 8,
    name: 'Douceur Printanière',
    desc: 'Fleurs mixtes du printemps',
    price: '49',
    badge: null,
    image: 'https://images.unsplash.com/photo-1494336877155-7fb9c6984f0a?auto=format&fit=crop&w=600&q=75',
  },
]

export default function FeaturedBouquets() {
  const [added, setAdded] = useState(null)

  const handleAdd = id => {
    setAdded(id)
    setTimeout(() => setAdded(null), 2200)
  }

  return (
    <section id="bouquets" className="py-24 lg:py-32 bg-[#FDFAF6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-5">
              03 — Bouquets
            </span>
            <h2 className="font-serif text-[#0F0C09] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92]">
              Nos créations<br />
              <span className="italic">signature</span>
            </h2>
          </motion.div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="self-start lg:self-end text-[0.6rem] tracking-[0.32em] uppercase font-medium text-[#9B1B30] border-b border-[#9B1B30]/50 pb-0.5 hover:border-[#9B1B30] transition-colors duration-300 mb-2"
          >
            Voir toute la boutique
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {bouquets.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                />

                {b.badge && (
                  <div className="absolute top-3 left-3 bg-[#0F0C09] text-[#B8922A] text-[0.48rem] tracking-[0.42em] uppercase px-3 py-1.5">
                    {b.badge}
                  </div>
                )}

                {/* Quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAdd(b.id)}
                    className="w-full bg-[#0F0C09] hover:bg-[#9B1B30] text-white text-[0.58rem] tracking-[0.32em] uppercase py-4 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {added === b.id ? (
                        <motion.span
                          key="ok"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={12} /> Ajouté
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag size={12} /> Ajouter
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-[#0F0C09] text-[0.95rem] mb-0.5 leading-tight">{b.name}</h3>
                  <p className="text-[#0F0C09]/40 text-[0.7rem] font-light">{b.desc}</p>
                </div>
                <div className="font-serif text-[#9B1B30] text-lg flex-shrink-0">{b.price} €</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
