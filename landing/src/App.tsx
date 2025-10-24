import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Standards from './components/Standards'
import Technology from './components/Technology'
import Partnership from './components/Partnership'
import UseCases from './components/UseCases'
import Roadmap from './components/Roadmap'
import WhyChoose from './components/WhyChoose'
import TechSpecs from './components/TechSpecs'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { initSmoothScroll } from './utils/smoothScroll'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Initialize smooth scrolling for hash links
    initSmoothScroll()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
      <Header scrolled={scrolled} />
      <Hero />
      <Introduction />
      <Standards />
      <Technology />
      <Partnership />
      <UseCases />
      <Roadmap />
      <WhyChoose />
      <TechSpecs />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App