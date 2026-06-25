import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const COORDS = [48.8748, 2.3066]

const pin = new L.DivIcon({
  html: '<div style="width:16px;height:16px;background:#9B1B30;border-radius:50%;border:3px solid white;box-shadow:0 2px 14px rgba(155,27,48,0.55)"></div>',
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

const info = [
  { Icon: MapPin, label: 'Adresse', val: '24, Rue des Fleurs, 75008 Paris' },
  { Icon: Phone, label: 'Téléphone', val: '01 23 45 67 89', href: 'tel:+33123456789' },
  { Icon: Mail, label: 'Email', val: 'contact@rose-elegance.fr', href: 'mailto:contact@rose-elegance.fr' },
  { Icon: Clock, label: 'Horaires', val: 'Lun – Sam : 8h30 – 19h30 · Dim : 9h – 13h' },
]

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ nom: '', email: '', message: '' }) }, 4500)
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FDFAF6]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="mb-14"
        >
          <span className="text-[#B8922A] text-[0.57rem] tracking-[0.52em] uppercase block mb-5">
            07 — Contact
          </span>
          <h2 className="font-serif text-[#0F0C09] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92]">
            Parlons de<br />
            <span className="italic">votre projet</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-20">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 gap-5 text-center min-h-[360px]"
                >
                  <div className="w-14 h-14 bg-[#9B1B30] flex items-center justify-center">
                    <Check size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif text-[#0F0C09] text-2xl">Message envoyé</h3>
                  <p className="text-[#0F0C09]/45 text-sm font-light max-w-xs leading-relaxed">
                    Nous vous répondrons dans les plus brefs délais. Merci de votre confiance.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-8"
                >
                  {/* Nom */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.55rem] tracking-[0.45em] uppercase text-[#0F0C09]/45">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      className="border-0 border-b border-[#0F0C09]/15 bg-transparent py-3 text-[#0F0C09] text-sm font-light placeholder-[#0F0C09]/25 focus:outline-none focus:border-[#9B1B30] transition-colors duration-300"
                      placeholder="Marie Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.55rem] tracking-[0.45em] uppercase text-[#0F0C09]/45">Adresse email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="border-0 border-b border-[#0F0C09]/15 bg-transparent py-3 text-[#0F0C09] text-sm font-light placeholder-[#0F0C09]/25 focus:outline-none focus:border-[#9B1B30] transition-colors duration-300"
                      placeholder="marie@email.fr"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.55rem] tracking-[0.45em] uppercase text-[#0F0C09]/45">Votre message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="border-0 border-b border-[#0F0C09]/15 bg-transparent py-3 text-[#0F0C09] text-sm font-light placeholder-[#0F0C09]/25 focus:outline-none focus:border-[#9B1B30] transition-colors duration-300 resize-none"
                      placeholder="Décrivez votre projet floral..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="self-start flex items-center gap-3 bg-[#9B1B30] hover:bg-[#B8202E] text-white text-[0.6rem] tracking-[0.35em] uppercase font-medium px-8 py-4 transition-colors duration-300"
                  >
                    Envoyer le message
                    <Send size={13} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            {/* Info list */}
            <div className="flex flex-col gap-7">
              {info.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 border border-[#0F0C09]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.Icon size={14} className="text-[#9B1B30]" />
                  </div>
                  <div>
                    <div className="text-[0.52rem] tracking-[0.4em] uppercase text-[#0F0C09]/35 mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[#0F0C09] text-sm font-light hover:text-[#9B1B30] transition-colors duration-300">
                        {item.val}
                      </a>
                    ) : (
                      <div className="text-[#0F0C09] text-sm font-light">{item.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Real map — clic ouvre Google Maps */}
            <div
              className="relative h-52 overflow-hidden border border-[#0F0C09]/8 cursor-pointer group"
              onClick={() => window.open(
                `https://www.google.com/maps/search/?api=1&query=${COORDS[0]},${COORDS[1]}`,
                '_blank'
              )}
            >
              <MapContainer
                center={COORDS}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                keyboard={false}
                attributionControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <Marker position={COORDS} icon={pin} />
              </MapContainer>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0F0C09]/0 group-hover:bg-[#0F0C09]/20 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                <span className="bg-white text-[#9B1B30] text-[0.5rem] tracking-[0.38em] uppercase px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  Ouvrir dans Google Maps →
                </span>
              </div>
            </div>
            <p className="text-[#0F0C09]/30 text-[0.5rem] tracking-[0.4em] uppercase text-center mt-2">
              24, Rue des Fleurs · Paris 8e
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
