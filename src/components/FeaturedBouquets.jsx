import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check, Star } from 'lucide-react'

const bouquets = [
  {
    id: 1,
    name: 'Bouquet Romantique',
    description: 'Un écrin de roses rouges sélectionnées à la main, symbole intemporel de la passion.',
    price: '49',
    badge: 'Bestseller',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 2,
    name: 'Jardin Printanier',
    description: 'Une explosion de couleurs pastel évoquant les jardins en pleine efflorescence.',
    price: '65',
    badge: 'Nouveau',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 3,
    name: 'Fraîcheur Sauvage',
    description: 'Compositions sauvages et poétiques, inspirées des prairies en fleurs.',
    price: '75',
    badge: null,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc16?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 4,
    name: 'Tulipes Pastel',
    description: 'Douces tulipes dans un camaïeu de roses et de blancs, délicatement disposées.',
    price: '55',
    badge: null,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 5,
    name: "Soleil d'Été",
    description: 'Tournesols généreux et fleurs de saison pour apporter soleil et joie de vivre.',
    price: '45',
    badge: 'Populaire',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 6,
    name: 'Rouge Passion',
    description: 'Luxueux bouquet de roses rouge bordeaux pour des déclarations qui marquent.',
    price: '89',
    badge: 'Premium',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 7,
    name: 'Élégance Blanche',
    description: 'Pureté et sophistication dans un bouquet immaculé de roses blanches et de pivoines.',
    price: '79',
    badge: null,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1775138386053-5766c8c10e85?auto=format&fit=crop&w=600&q=72',
  },
  {
    id: 8,
    name: 'Brume Dorée',
    description: "Création florale d’exception mêlant fleurs exotiques et feuillages dorés.",
    price: '95',
    badge: 'Exclusif',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1719238899351-d1e049172e97?auto=format&fit=crop&w=600&q=72',
  },
]

export default function FeaturedBouquets() {
  const [added, setAdded] = useState(null)

  const handleAdd = id => {
    setAdded(id)
    setTimeout(() => setAdded(null), 2200)
  }

  return (
    <section id="bouquets" className="py-28 bg-white">
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Sélection du Moment</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">Nos bouquets vedettes</h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Chaque création est réalisée par nos fleuristes avec une attention particulière aux détails et aux émotions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bouquets.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/80 transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <motion.img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.65 }}
                  loading="lazy"
                  decoding="async"
                />
                {b.badge && (
                  <span className="absolute top-3 left-3 bg-[#B71C1C] text-white text-[0.6rem] font-medium tracking-[0.18em] uppercase px-3 py-1">
                    {b.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2.5">
                  {Array.from({ length: b.rating }).map((_, k) => (
                    <Star key={k} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                  {b.rating < 5 && <Star size={11} className="text-gray-200" />}
                </div>

                <h3 className="font-serif text-lg text-[#1F2937] mb-1.5">{b.name}</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed flex-1 mb-4">
                  {b.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="font-serif text-xl text-[#B71C1C]">
                    {b.price} <span className="text-sm">€</span>
                  </span>

                  <motion.button
                    onClick={() => handleAdd(b.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.18em] uppercase px-4 py-2.5 transition-all duration-300 ${
                      added === b.id
                        ? 'bg-green-600 text-white'
                        : 'bg-[#1F2937] text-white hover:bg-[#B71C1C]'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {added === b.id ? (
                        <motion.span
                          key="ok"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check size={13} />
                          Ajouté
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <ShoppingCart size={13} />
                          Panier
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-block border border-[#1F2937] text-[#1F2937] text-[0.7rem] font-medium tracking-[0.22em] uppercase px-10 py-4 hover:bg-[#1F2937] hover:text-white transition-all duration-300"
          >
            Voir toutes nos créations
          </a>
        </motion.div>
      </div>
    </section>
  )
}
