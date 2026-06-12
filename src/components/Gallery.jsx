import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=72',
    alt: 'Roses rouges en gros plan',
  },
  {
    src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=72',
    alt: 'Bouquet de fleurs colorées',
  },
  {
    src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=72',
    alt: 'Tulipes roses',
  },
  {
    src: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=700&q=72',
    alt: 'Tournesols dorés',
  },
  {
    src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=700&q=72',
    alt: 'Roses de jardin',
  },
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc16?auto=format&fit=crop&w=700&q=72',
    alt: 'Fleurs de saison',
  },
  {
    src: 'https://images.unsplash.com/photo-1719238899351-d1e049172e97?auto=format&fit=crop&w=700&q=72',
    alt: 'Composition florale premium',
  },
  {
    src: 'https://images.unsplash.com/photo-1775138386053-5766c8c10e85?auto=format&fit=crop&w=700&q=72',
    alt: 'Roses blanches élégantes',
  },
  {
    src: 'https://images.unsplash.com/photo-1494336877155-7fb9c6984f0a?auto=format&fit=crop&w=700&q=72',
    alt: 'Cadeau floral',
  },
]

// Build full-res URL for lightbox by upgrading the thumbnail params
function fullResUrl(thumbnailSrc) {
  return thumbnailSrc.replace('w=700&q=72', 'w=1400&q=90')
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  // Close lightbox with Escape key
  useEffect(() => {
    if (!lightbox) return
    const onKey = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section id="gallery" className="py-28 bg-white">
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">L'Art Floral</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">Galerie Premium</h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Un aperçu de nos réalisations et du savoir-faire qui distingue chacune de nos créations.
          </p>
        </motion.div>

        {/* Masonry */}
        <div className="masonry">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="masonry-item group relative overflow-hidden cursor-pointer"
              onClick={() => setLightbox(img)}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto block"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.55 }}
                loading="lazy"
                decoding="async"
              />
              {/* Overlay — pure CSS group-hover, no Framer Motion inline opacity conflict */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox — displays full-resolution image */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              onClick={() => setLightbox(null)}
              aria-label="Fermer"
            >
              <X size={20} className="text-white" />
            </button>
            <motion.img
              src={fullResUrl(lightbox.src)}
              alt={lightbox.alt}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-7 left-0 right-0 text-center text-white/50 text-xs tracking-widest uppercase">
              {lightbox.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
