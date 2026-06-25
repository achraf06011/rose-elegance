import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collections from './components/Collections'
import Atelier from './components/Atelier'
import FeaturedBouquets from './components/FeaturedBouquets'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import CategoryPage from './pages/CategoryPage'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <Atelier />
        <FeaturedBouquets />
        <Services />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
