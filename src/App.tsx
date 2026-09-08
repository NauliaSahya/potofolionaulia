import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/hero/Hero'
import { LanyardIntro } from '@/components/hero/LanyardIntro'
import { About } from '@/components/About'
import { Work } from '@/components/work/Work'
import { ProjectSIRJ } from '@/components/work/ProjectSIRJ'
import { ProjectCENIM } from '@/components/work/ProjectCENIM'
import { ProjectHiMe } from '@/components/work/ProjectHiMe'
import { ProjectMedicalCoding } from '@/components/work/ProjectMedicalCoding'
import { Experience } from '@/components/Experience'
import { Organization } from '@/components/Organization'
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
          <ProjectSIRJ />
          <ProjectCENIM />
          <ProjectHiMe />
          <ProjectMedicalCoding />
          <Experience />
          <Organization />
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
