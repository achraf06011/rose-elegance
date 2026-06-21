import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const images = [
  { src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=72', alt: 'Roses rouges en gros plan' },
  { src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=72', alt: 'Bouquet de fleurs colorées' },
  { src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=72', alt: 'Tulipes roses' },
  { src: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=700&q=72', alt: 'Tournesols dorés' },
  { src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=700&q=72', alt: 'Roses de jardin' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc16?auto=format&fit=crop&w=700&q=72', alt: 'Fleurs de saison' },
  { src: 'https://images.unsplash.com/photo-1719238899351-d1e049172e97?auto=format&fit=crop&w=700&q=72', alt: 'Composition florale premium' },
  { src: 'https://images.unsplash.com/photo-1775138386053-5766c8c10e85?auto=format&fit=crop&w=700&q=72', alt: 'Roses blanches élégantes' },
  { src: 'https://images.unsplash.com/photo-1494336877155-7fb9c6984f0a?auto=format&fit=crop&w=700&q=72', alt: 'Cadeau floral' },
]

const fullRes = src => src.replace('w=700&q=72', 'w=1400&q=90')

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const fn = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox])

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#FDFAF6]">
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
              05 — Galerie
            </span>
            <h2 className="font-serif text-[#0F0C09] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92]">
              L'art en<br />
              <span className="italic">images</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-[#0F0C09]/40 text-sm font-light max-w-[240px] lg:mb-2 leading-relaxed"
          >
            Un aperçu de nos réalisations. Cliquez sur une image pour l'agrandir.
          </motion.p>
        </div>

        {/* Masonry */}
        <div className="masonry">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.055, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="masonry-item group relative overflow-hidden cursor-pointer"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
              {/* Overlay — pure CSS, no Framer Motion conflict */}
              <div className="absolute inset-0 bg-[#0F0C09]/0 group-hover:bg-[#0F0C09]/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <div className="w-11 h-11 border border-white/50 flex items-center justify-center">
                    <ZoomIn size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0F0C09]/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Fermer"
            >
              <X size={18} className="text-white/70" />
            </button>
            <motion.img
              src={fullRes(lightbox.src)}
              alt={lightbox.alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/30 text-[0.55rem] tracking-[0.4em] uppercase">
              {lightbox.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
