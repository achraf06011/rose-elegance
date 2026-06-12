import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedBouquets from './components/FeaturedBouquets'
import WhyChooseUs from './components/WhyChooseUs'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedBouquets />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Services />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
