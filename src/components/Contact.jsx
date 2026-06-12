import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const infos = [
  {
    Icon: MapPin,
    label: 'Adresse',
    value: '24, Rue des Fleurs, 75008 Paris',
  },
  {
    Icon: Phone,
    label: 'Téléphone',
    value: '01 23 45 67 89',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'contact@rose-elegance.fr',
  },
  {
    Icon: Clock,
    label: 'Horaires',
    value: 'Lun – Sam : 8h30 – 19h30\nDimanche : 9h – 13h',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nom: '', email: '', telephone: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 bg-[#FAF7F2]">
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
            <span className="text-[#B71C1C] text-[0.65rem] font-medium tracking-[0.32em] uppercase">Contactez-nous</span>
            <div className="w-10 h-px bg-[#B71C1C]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2937] mb-4">Parlons de votre projet</h2>
          <p className="text-gray-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Que ce soit pour une commande, un événement ou simplement pour en savoir plus — nous sommes là.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-8 sm:p-10 border border-gray-100 shadow-sm"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center"
              >
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="font-serif text-2xl text-[#1F2937]">Message envoyé !</h3>
                <p className="text-gray-500 text-sm font-light">Nous vous répondrons dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-serif text-2xl text-[#1F2937] mb-1">Envoyer un message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nom" className="text-[0.7rem] font-medium text-gray-600 tracking-wide uppercase">
                      Nom complet <span className="text-[#B71C1C]">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Marie Dupont"
                      className="border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-300 focus:outline-none focus:border-[#B71C1C] transition-colors duration-200 bg-[#FAF7F2]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telephone" className="text-[0.7rem] font-medium text-gray-600 tracking-wide uppercase">
                      Téléphone
                    </label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={form.telephone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className="border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-300 focus:outline-none focus:border-[#B71C1C] transition-colors duration-200 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.7rem] font-medium text-gray-600 tracking-wide uppercase">
                    Email <span className="text-[#B71C1C]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="marie@exemple.fr"
                    className="border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-300 focus:outline-none focus:border-[#B71C1C] transition-colors duration-200 bg-[#FAF7F2]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[0.7rem] font-medium text-gray-600 tracking-wide uppercase">
                    Message <span className="text-[#B71C1C]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet floral, votre occasion, votre budget..."
                    className="border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder-gray-300 focus:outline-none focus:border-[#B71C1C] transition-colors duration-200 resize-none bg-[#FAF7F2]"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#B71C1C] text-white text-xs font-medium tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-3 hover:bg-[#D32F2F] transition-colors duration-300 mt-2"
                >
                  <Send size={14} />
                  Envoyer le message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Info items */}
            <div className="bg-white border border-gray-100 shadow-sm p-8 sm:p-10">
              <h3 className="font-serif text-2xl text-[#1F2937] mb-7">Informations</h3>
              <div className="flex flex-col gap-6">
                {infos.map(info => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#FAF7F2] flex items-center justify-center flex-shrink-0">
                      <info.Icon size={18} className="text-[#B71C1C]" />
                    </div>
                    <div>
                      <div className="text-[0.65rem] font-medium text-gray-400 tracking-[0.22em] uppercase mb-1">
                        {info.label}
                      </div>
                      <div className="text-sm text-[#1F2937] font-light whitespace-pre-line">
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative bg-white border border-gray-100 shadow-sm overflow-hidden h-52 flex-shrink-0">
              {/* Decorative map visual */}
              <div className="absolute inset-0 bg-[#FAF7F2]">
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 border-t border-gray-200"
                    style={{ top: `${(i + 1) * 16}%` }}
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-gray-200"
                    style={{ left: `${(i + 1) * 12}%` }}
                  />
                ))}
                {/* Streets */}
                <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-white border-x border-gray-300" />
                <div className="absolute left-0 right-0 top-2/5 h-3 bg-white border-y border-gray-300" />
                <div className="absolute left-0 right-0 top-3/5 h-2 bg-white border-y border-gray-200" />
                <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-white border-x border-gray-200" />
                {/* Pin */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#B71C1C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/30">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="w-0.5 h-4 bg-[#B71C1C]" />
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="bg-white/90 text-[#1F2937] text-xs font-medium px-3 py-1.5 shadow-sm border border-gray-100">
                    24, Rue des Fleurs, Paris 8e
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
