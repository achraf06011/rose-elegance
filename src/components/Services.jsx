import { motion } from 'framer-motion'
import { Heart, Cake, Sparkles, Briefcase, Home, Package } from 'lucide-react'

const services = [
  {
    Icon: Heart,
    title: 'Mariages',
    desc: "De la décoration de cérémonie au bouquet de mariée, nous créons l'atmosphère florale de votre plus beau jour.",
    accent: 'Devis sur mesure',
  },
  {
    Icon: Cake,
    title: 'Anniversaires',
    desc: 'Surprenez vos proches avec des arrangements floraux personnalisés qui marquent les esprits et les cœurs.',
    accent: 'Livraison le jour J',
  },
  {
    Icon: Sparkles,
    title: 'Saint-Valentin',
    desc: 'Exprimez votre amour avec nos collections exclusives de roses et de compositions romantiques.',
    accent: 'Collections exclusives',
  },
  {
    Icon: Briefcase,
    title: 'Événements corporatifs',
    desc: 'Fleurissez vos espaces professionnels, conférences et réceptions avec élégance et raffinement.',
    accent: 'Tarifs entreprises',
  },
  {
    Icon: Home,
    title: 'Décoration florale',
    desc: 'Sublimez votre intérieur avec des abonnements floraux hebdomadaires ou des compositions permanentes.',
    accent: 'Abonnements disponibles',
  },
  {
    Icon: Package,
    title: 'Livraison express',
    desc: 'Service de livraison le jour même à Paris — parce que certaines émotions ne peuvent pas attendre.',
    accent: 'Livraison en 3h',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white">
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Ce que nous offrons</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">Nos services floraux</h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            De l'occasion la plus intime au grand événement, nous avons une solution florale adaptée.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: '0 20px 60px -12px rgba(0,0,0,0.1)' }}
              className="group bg-white border border-gray-100 p-8 flex flex-col gap-5 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-[#FAF7F2] group-hover:bg-[#B71C1C]/8 transition-colors duration-300 flex items-center justify-center">
                <s.Icon size={22} className="text-[#B71C1C]" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2.5 flex-1">
                <h3 className="font-serif text-xl text-[#1F2937]">{s.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed flex-1">{s.desc}</p>
              </div>

              {/* Accent */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B71C1C]" />
                <span className="text-[#B71C1C] text-xs font-medium tracking-wide">{s.accent}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
