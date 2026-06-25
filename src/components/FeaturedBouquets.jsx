import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, ImageOff } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function FeaturedBouquets() {
  const { products } = useStore()
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

        {/* Empty state */}
        {products.length === 0 && (
          <div className="border-2 border-dashed border-[#0F0C09]/10 py-24 flex flex-col items-center gap-3 text-center">
            <ImageOff size={32} className="text-[#0F0C09]/15" />
            <p className="text-[#0F0C09]/30 text-sm font-light">
              Aucun produit pour l'instant — ajoutez-en depuis{' '}
              <a href="#/admin" className="text-[#9B1B30] hover:underline">l'espace admin</a>.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-[#0F0C09]/[0.07] hover:border-[#9B1B30]/35 transition-all duration-300 flex flex-col"
            >
              {/* Visual area */}
              <div className="bg-[#F5F1EC] relative overflow-hidden flex items-center justify-center aspect-[4/3]">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="font-serif text-[#0F0C09]/[0.065] text-[5rem] sm:text-[6rem] lg:text-[7rem] leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute top-4 left-4 w-4 h-px bg-[#B8922A]/40" />
                    <div className="absolute top-4 left-4 w-px h-4 bg-[#B8922A]/40" />
                    <div className="absolute bottom-4 right-4 w-4 h-px bg-[#B8922A]/40" />
                    <div className="absolute bottom-4 right-4 w-px h-4 bg-[#B8922A]/40" />
                  </>
                )}

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
                  {b.desc && <p className="text-[#0F0C09]/35 text-[0.68rem] font-light">{b.desc}</p>}
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
