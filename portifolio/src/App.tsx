import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <HomeSection/>
        <ProjectsSection/>
      </div>
    </>
  )
}

export default App
