import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ImageOff, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../context/StoreContext'

export default function CategoryPage() {
  const { id } = useParams()
  const { categories, productsByCategory } = useStore()
  const [added, setAdded] = useState(null)

  const category = categories.find(c => c.id === id)
  const products  = productsByCategory(id)

  const handleAdd = pid => {
    setAdded(pid)
    setTimeout(() => setAdded(null), 2000)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm">Catégorie introuvable.</p>
          <Link to="/" className="text-[#9B1B30] text-xs hover:underline flex items-center gap-1 justify-center">
            <ArrowLeft size={12} /> Retour
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#0F0C09] transition-colors"
        >
          <ArrowLeft size={13} /> Rose Élégance
        </Link>
        <span className="font-serif text-[#0F0C09] text-sm hidden sm:block">{category.name}</span>
        <div className="w-20" />
      </div>

      {/* Hero header */}
      <div className="pt-20 pb-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[#B8922A] text-[0.52rem] tracking-[0.5em] uppercase block mb-5 mt-8">
            Collection
          </span>
          <h1 className="font-serif text-[#0F0C09] text-[clamp(3.2rem,8vw,8rem)] leading-[0.88] mb-4">
            {category.name}
          </h1>
          <p className="text-gray-400 text-sm font-light">
            {products.length} {products.length === 1 ? 'création' : 'créations'}
          </p>
        </motion.div>
        <div className="mt-8 border-t border-gray-100" />
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-28 gap-4 text-center"
          >
            <ImageOff size={36} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Aucun produit dans cette catégorie pour l'instant.</p>
            <Link
              to="/admin"
              className="text-[#9B1B30] text-xs flex items-center gap-1 hover:underline mt-1"
            >
              Ajouter depuis l'espace admin →
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border border-gray-100 hover:border-[#9B1B30]/25 transition-colors duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#F8F5F0] relative overflow-hidden">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-[#0F0C09]/[0.07] text-[4.5rem] leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {prod.badge && (
                    <span className="absolute top-2 left-2 bg-[#9B1B30] text-white text-[0.44rem] tracking-[0.4em] uppercase px-2 py-1">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1 border-t border-gray-100">
                  <div className="flex-1">
                    <h3 className="font-serif text-[#0F0C09] text-base leading-tight mb-1">{prod.name}</h3>
                    {prod.desc && <p className="text-gray-400 text-xs font-light">{prod.desc}</p>}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-serif text-[#9B1B30] text-xl">{prod.price} €</span>
                    <button
                      onClick={() => handleAdd(prod.id)}
                      className={`flex items-center gap-1.5 text-[0.53rem] tracking-[0.3em] uppercase transition-colors duration-300 ${
                        added === prod.id ? 'text-green-600' : 'text-gray-400 hover:text-[#9B1B30]'
                      }`}
                    >
                      <ShoppingBag size={11} />
                      {added === prod.id ? 'Ajouté' : 'Ajouter'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
