import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/hero/Hero'
import { LanyardIntro } from '@/components/hero/LanyardIntro'
import { About } from '@/components/About'
import { Work } from '@/components/work/Work'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { LanguagesEducation } from '@/components/LanguagesEducation'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { CursorSpotlight } from '@/components/CursorSpotlight'

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <>
      <div inert={unlocked ? undefined : true}>
        <CursorSpotlight />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Work />
          <Experience />
          <Skills />
          <LanguagesEducation />
          <Contact />
        </main>
        <Footer />
      </div>

      {!unlocked && <LanyardIntro onUnlock={() => setUnlocked(true)} />}
    </>
  )
}

export default App
