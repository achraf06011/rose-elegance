import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'

const bouquets = [
  { id: 1, name: 'Éclat de Roses',      desc: 'Roses de Damask & pivoines',    price: '89',  badge: 'Bestseller' },
  { id: 2, name: 'Nuage Blanc',          desc: 'Roses blanches & muguet',       price: '72',  badge: null },
  { id: 3, name: "Soleil d'Or",          desc: 'Tournesols & chrysanthèmes',    price: '55',  badge: 'Nouveau' },
  { id: 4, name: 'Poésie Rose',          desc: 'Tulipes & pivoines',            price: '68',  badge: null },
  { id: 5, name: 'Romance Florale',      desc: 'Mélange de roses sauvages',     price: '95',  badge: 'Exclusif' },
  { id: 6, name: 'Jardin Secret',        desc: 'Bouquet champêtre de saison',   price: '62',  badge: null },
  { id: 7, name: 'Bouquet Prestige',     desc: 'Roses dorées & amaryllis',      price: '125', badge: 'Premium' },
  { id: 8, name: 'Douceur Printanière',  desc: 'Fleurs mixtes du printemps',    price: '49',  badge: null },
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
            className="self-start lg:self-end text-[0.6rem] tracking-[0.32em] uppercase font-medium text-[#9B1B30] border-b border-[#9B1B30]/40 pb-0.5 hover:border-[#9B1B30] transition-colors duration-300 mb-2"
          >
            Commander sur mesure
          </motion.a>
        </div>

        {/* Cards — no photos, typographic design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {bouquets.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-[#0F0C09]/[0.07] hover:border-[#9B1B30]/35 transition-all duration-300 flex flex-col"
            >
              {/* Visual area — number as decorative element */}
              <div className="bg-[#F5F1EC] relative overflow-hidden flex items-center justify-center p-6 aspect-[4/3]">
                <span className="font-serif text-[#0F0C09]/[0.065] text-[5rem] sm:text-[6rem] lg:text-[7rem] leading-none select-none">
                  {String(b.id).padStart(2, '0')}
                </span>
                {/* Thin decorative lines */}
                <div className="absolute top-4 left-4 w-4 h-px bg-[#B8922A]/40" />
                <div className="absolute top-4 left-4 w-px h-4 bg-[#B8922A]/40" />
                <div className="absolute bottom-4 right-4 w-4 h-px bg-[#B8922A]/40" />
                <div className="absolute bottom-4 right-4 w-px h-4 bg-[#B8922A]/40" />

                {b.badge && (
                  <div className="absolute top-3 right-3 bg-[#9B1B30] text-white text-[0.46rem] tracking-[0.4em] uppercase px-2.5 py-1.5">
                    {b.badge}
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 border-t border-[#0F0C09]/[0.06]">
                <div className="flex-1">
                  <h3 className="font-serif text-[#0F0C09] text-base sm:text-lg mb-0.5 leading-tight">{b.name}</h3>
                  <p className="text-[#0F0C09]/35 text-[0.68rem] font-light">{b.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#0F0C09]/[0.06]">
                  <span className="font-serif text-[#9B1B30] text-xl leading-none">{b.price} €</span>
                  <button
                    onClick={() => handleAdd(b.id)}
                    className="flex items-center gap-1.5 text-[0.55rem] tracking-[0.3em] uppercase text-[#0F0C09]/40 hover:text-[#9B1B30] transition-colors duration-300"
                  >
                    <AnimatePresence mode="wait">
                      {added === b.id ? (
                        <motion.span
                          key="ok"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5 text-green-600"
                        >
                          <Check size={11} /> Ajouté
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <ShoppingBag size={11} /> Ajouter
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
