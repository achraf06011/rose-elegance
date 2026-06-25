import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Mariages',
    desc: "De la décoration de cérémonie au bouquet de mariée, nous créons l'atmosphère florale de votre plus beau jour.",
    accent: 'Devis sur mesure',
  },
  {
    num: '02',
    title: 'Anniversaires',
    desc: 'Surprenez vos proches avec des arrangements floraux personnalisés qui marquent les esprits et les cœurs.',
    accent: 'Livraison le jour J',
  },
  {
    num: '03',
    title: 'Saint-Valentin',
    desc: 'Exprimez votre amour avec nos collections exclusives de roses et de compositions romantiques sur mesure.',
    accent: 'Collections exclusives',
  },
  {
    num: '04',
    title: 'Événements corporatifs',
    desc: 'Fleurissez vos espaces professionnels, conférences et réceptions avec élégance et raffinement.',
    accent: 'Tarifs entreprises',
  },
  {
    num: '05',
    title: 'Décoration florale',
    desc: 'Sublimez votre intérieur avec des abonnements floraux hebdomadaires ou des compositions permanentes.',
    accent: 'Abonnements dispo',
  },
  {
    num: '06',
    title: 'Livraison express',
    desc: "Service de livraison le jour même à Paris — parce que certaines émotions ne peuvent pas attendre.",
    accent: 'Livraison en 3h',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0F0C09]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 lg:mb-18"
        >
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-5">
            04 — Services
          </span>
          <h2 className="font-serif text-white text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92]">
            Nos prestations<br />
            <span className="italic text-[#E8CFC8]">florales</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#0F0C09] hover:bg-[#161210] transition-colors duration-300 p-8 lg:p-10 cursor-default"
            >
              {/* Big number */}
              <div className="font-serif text-[#B8922A]/30 text-7xl leading-none mb-5 group-hover:text-[#B8922A]/55 transition-colors duration-300 select-none">
                {s.num}
              </div>

              <h3 className="font-serif text-white text-xl mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-6">{s.desc}</p>

              <div className="flex items-center gap-2.5">
                <div className="w-0 group-hover:w-6 h-px bg-[#9B1B30] transition-all duration-500 flex-shrink-0" />
                <span className="text-[#B8922A] text-[0.5rem] tracking-[0.42em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {s.accent}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
