import { motion } from 'framer-motion'
import { Truck, Leaf, Scissors, ShieldCheck, HeartHandshake, BadgeCheck } from 'lucide-react'

const features = [
  {
    Icon: Truck,
    title: 'Livraison rapide',
    desc: 'Livraison le jour même à Paris et en région parisienne. Votre bouquet arrive frais et intact.',
  },
  {
    Icon: Leaf,
    title: 'Fleurs fraîches',
    desc: 'Nous nous approvisionnons directement auprès des meilleurs producteurs français et européens.',
  },
  {
    Icon: Scissors,
    title: 'Créations artisanales',
    desc: 'Chaque bouquet est confectionné à la main par nos fleuristes diplômés avec soin et passion.',
  },
  {
    Icon: ShieldCheck,
    title: 'Paiement sécurisé',
    desc: 'Transactions 100 % sécurisées. Nous acceptons CB, virement et PayPal.',
  },
  {
    Icon: HeartHandshake,
    title: 'Service personnalisé',
    desc: 'Un conseiller floral dédié pour vous aider à trouver la création qui exprime exactement vos émotions.',
  },
  {
    Icon: BadgeCheck,
    title: 'Satisfaction garantie',
    desc: "Vous n'êtes pas satisfait ? Nous vous offrons un remplacement ou un remboursement, sans question.",
  },
]

export default function WhyChooseUs() {
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Notre Promesse</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Depuis 2008, nous avons bâti notre réputation sur l'excellence, la qualité et l'amour du métier.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.01 }}
              className="bg-[#FAF7F2] hover:bg-white p-8 lg:p-10 flex flex-col gap-5 cursor-default group transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#B71C1C]/8 group-hover:bg-[#B71C1C]/14 transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                <f.Icon size={22} className="text-[#B71C1C]" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#1F2937] mb-2.5">{f.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
