import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Leclerc',
    role: 'Cliente fidèle depuis 2019',
    text: "Rose Élégance a sublimé mon mariage. Chaque arrangement était d'une beauté à couper le souffle. L'équipe a su interpréter ma vision et la dépasser. Je recommande les yeux fermés.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    role: 'Directeur événementiel',
    text: "Pour nos événements d'entreprise, nous ne faisons appel qu'à Rose Élégance. La ponctualité, la qualité et le sens du détail sont au rendez-vous à chaque fois. Un partenaire de confiance.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 3,
    name: 'Sophie Moreau',
    role: 'Amatrice de fleurs',
    text: "J'offre des bouquets de Rose Élégance à mes proches depuis des années. La fraîcheur des fleurs est inégalée, et les compositions sont toujours originales et raffinées. Un vrai coup de cœur.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 4,
    name: 'Pierre Dumont',
    role: 'Organisateur de mariages',
    text: "Collaborer avec Rose Élégance, c'est travailler avec de vrais artistes. Leur créativité, leur professionnalisme et leur passion pour les fleurs transparaissent dans chaque création. Exceptionnel.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=75',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback(d => {
    setDir(d)
    setCurrent(c => (c + d + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => go(1), 5500)
    return () => clearInterval(id)
  }, [go])

  const variants = {
    enter: d => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: d => ({ opacity: 0, x: d > 0 ? -50 : 50, transition: { duration: 0.35 } }),
  }

  const t = testimonials[current]

  return (
    <section className="py-24 lg:py-32 bg-[#FDFAF6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="mb-16"
        >
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-5">
            06 — Témoignages
          </span>
          <h2 className="font-serif text-[#0F0C09] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92]">
            Ce qu'ils<br />
            <span className="italic">disent de nous</span>
          </h2>
        </motion.div>

        {/* Testimonial block */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="relative min-h-[220px]">
            {/* Decorative large quote */}
            <div className="absolute -top-4 -left-2 font-serif text-[#0F0C09]/[0.04] text-[10rem] leading-none select-none pointer-events-none">
              "
            </div>

            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={t.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                <p className="font-serif text-[#0F0C09] text-xl sm:text-2xl lg:text-[1.7rem] font-light leading-[1.5] mb-10 max-w-3xl italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="48"
                    height="48"
                  />
                  <div>
                    <div className="font-medium text-[#0F0C09] text-sm">{t.name}</div>
                    <div className="text-[#0F0C09]/40 text-xs font-light">{t.role}</div>
                  </div>
                  <div className="ml-4 flex gap-1.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#B8922A]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow controls */}
          <div className="flex lg:flex-col items-center gap-4 lg:pt-6">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 border border-[#0F0C09]/12 hover:border-[#9B1B30] hover:text-[#9B1B30] flex items-center justify-center transition-all duration-300 text-[#0F0C09]/40"
              aria-label="Précédent"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="text-[#0F0C09]/25 text-xs font-light tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </div>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 bg-[#9B1B30] text-white hover:bg-[#B8202E] flex items-center justify-center transition-colors duration-300"
              aria-label="Suivant"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress lines */}
        <div className="flex gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
              className={`transition-all duration-300 h-0.5 ${
                i === current ? 'w-10 bg-[#9B1B30]' : 'w-4 bg-[#0F0C09]/12 hover:bg-[#0F0C09]/25'
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
