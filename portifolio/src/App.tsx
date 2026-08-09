import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
        <ContactSection/>
      </div>
      <Footer/>
    </>
  )
}

export default App
