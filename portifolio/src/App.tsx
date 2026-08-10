import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import { LanguageProvider } from "./i18n/LanguageContext"

const App = () => {
  return (
    <LanguageProvider>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
        <ContactSection/>
      </div>
      <Footer/>
    </LanguageProvider>
  )
}

export default App
