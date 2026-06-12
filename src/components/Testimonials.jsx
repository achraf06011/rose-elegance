import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Leclerc',
    role: 'Cliente fidèle depuis 2019',
    text: "Rose Élégance a sublimé mon mariage. Chaque arrangement était d'une beauté à couper le souffle. L'équipe a su interpréter ma vision et la dépasser. Je recommande les yeux fermés.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    role: 'Directeur événementiel',
    text: "Pour nos événements d'entreprise, nous ne faisons appel qu'à Rose Élégance. La ponctualité, la qualité et le sens du détail sont au rendez-vous à chaque fois. Un partenaire de confiance.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 3,
    name: 'Sophie Moreau',
    role: 'Amatrice de fleurs',
    text: "J'offre des bouquets de Rose Élégance à mes proches depuis des années. La fraîcheur des fleurs est inégalée, et les compositions sont toujours originales et raffinées. Un vrai coup de cœur.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=75',
  },
  {
    id: 4,
    name: 'Pierre Dumont',
    role: 'Organisateur de mariages',
    text: "Collaborer avec Rose Élégance, c'est travailler avec des vrais artistes. Leur créativité, leur professionnalisme et leur passion pour les fleurs transparaissent dans chaque création. Exceptionnel.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=75',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback(
    dir => {
      setDirection(dir)
      setCurrent(c => (c + dir + testimonials.length) % testimonials.length)
    },
    [],
  )

  useEffect(() => {
    const id = setInterval(() => go(1), 5000)
    return () => clearInterval(id)
  }, [go])

  const variants = {
    enter: dir => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: dir => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.35 } }),
  }

  const t = testimonials[current]

  return (
    <section className="py-28 bg-[#FAF7F2]">
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Témoignages</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">Ce que disent nos clients</h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Leur satisfaction est notre plus belle récompense.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white p-10 md:p-14 shadow-sm border border-gray-100 min-h-[280px] flex flex-col justify-between overflow-hidden">
            {/* Quote icon */}
            <Quote size={48} className="absolute top-8 right-8 text-[#B71C1C]/8 rotate-180" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#B71C1C]/20"
                    loading="lazy"
                    decoding="async"
                    width="48"
                    height="48"
                  />
                  <div>
                    <div className="font-medium text-[#1F2937] text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs font-light">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-7 h-2 bg-[#B71C1C]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 border border-gray-200 hover:border-[#B71C1C] hover:text-[#B71C1C] flex items-center justify-center transition-all duration-300 text-gray-500"
                aria-label="Précédent"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 bg-[#B71C1C] text-white hover:bg-[#D32F2F] flex items-center justify-center transition-all duration-300"
                aria-label="Suivant"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
