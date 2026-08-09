import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import SkillsSection from "./components/SkillsSection"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
        <SkillsSection/>
      </div>
    </>
  )
}

export default App
