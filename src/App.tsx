import { LangProvider } from './LangContext'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import { SkillsSection, AboutSection, ContactSection } from './components/Sections'
import CursorSpotlight from './components/CursorSpotlight'
import IntroLoader from './components/IntroLoader'
import SmoothScroll from './components/SmoothScroll'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <IntroLoader>
          <SmoothScroll />
          <CursorSpotlight />
          <main className="noise overflow-x-clip bg-[#F5EFE4] dark:bg-ink min-h-screen transition-colors duration-300">
            <Navbar />
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <ContactSection />
          </main>
          <BackToTop />
        </IntroLoader>
      </LangProvider>
    </ThemeProvider>
  )
}
