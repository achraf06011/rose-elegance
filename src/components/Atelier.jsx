import { motion } from 'framer-motion'
import { Award, Heart, Leaf } from 'lucide-react'

const values = [
  {
    Icon: Leaf,
    label: 'Fleurs de saison',
    desc: "Approvisionnement direct auprès des producteurs locaux français et européens.",
  },
  {
    Icon: Heart,
    label: 'Savoir-faire artisanal',
    desc: "Chaque composition est créée à la main par nos maîtres fleuristes diplômés.",
  },
  {
    Icon: Award,
    label: 'Excellence garantie',
    desc: "Remplacement ou remboursement complet si vous n'êtes pas entièrement satisfait.",
  },
]

export default function Atelier() {
  return (
    <section className="bg-[#0F0C09] flex flex-col lg:flex-row min-h-[80vh]">

      {/* Image */}
      <div className="lg:w-1/2 relative overflow-hidden min-h-[55vw] lg:min-h-0">
        <motion.img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
          alt="Atelier Rose Élégance — Fleurs artisanales"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient to blend with text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F0C09]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C09]/40 to-transparent" />

        {/* Floating stat badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-10 left-8 border border-[#B8922A]/40 p-5"
        >
          <div className="font-serif text-white text-4xl leading-none">15</div>
          <div className="text-[#B8922A] text-[0.52rem] tracking-[0.4em] uppercase mt-1">Années de passion</div>
        </motion.div>
      </div>

      {/* Text */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-24 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-6">
            02 — Notre Atelier
          </span>
          <h2 className="font-serif text-white text-[clamp(2rem,4vw,4rem)] leading-[1.05] mb-6">
            L'art de créer<br />
            <span className="italic text-[#E8CFC8]">de la beauté</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-[0.95rem] font-light leading-relaxed mb-10 max-w-[340px]">
            Fondé en 2008 à Paris, Rose Élégance est né d'une passion profonde pour l'art floral et du désir de créer des compositions qui transcendent le simple bouquet.
          </p>

          {/* Values */}
          <div className="flex flex-col gap-7">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 group"
              >
                <div className="w-10 h-10 border border-[#B8922A]/25 group-hover:border-[#B8922A]/60 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                  <v.Icon size={15} className="text-[#B8922A]" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium mb-1">{v.label}</div>
                  <div className="text-white/35 text-xs font-light leading-relaxed">{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
