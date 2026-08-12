import { useState } from 'react'
import Header from './components/Header'
import DemoExperience from './components/DemoExperience'
import VideoTestimonials from './components/VideoTestimonials'
import FeatureSection from './components/FeatureSection'
import TextTestimonials from './components/TextTestimonials'
import CtaBand from './components/CtaBand'
import Faq from './components/Faq'
import Footer from './components/Footer'

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  return (
    <>
      <Header />
      <main>
        <DemoExperience step={step} onStepChange={setStep} />
        {step === 1 && (
          <>
            <VideoTestimonials />
            <FeatureSection />
            <TextTestimonials />
            <CtaBand />
            <Faq />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
