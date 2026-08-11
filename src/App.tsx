import Header from './components/Header'
import Hero from './components/Hero'
import VideoTestimonials from './components/VideoTestimonials'
import FeatureSection from './components/FeatureSection'
import TextTestimonials from './components/TextTestimonials'
import CtaBand from './components/CtaBand'
import Faq from './components/Faq'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoTestimonials />
        <FeatureSection />
        <TextTestimonials />
        <CtaBand />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default App
