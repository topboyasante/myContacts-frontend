import Hero from "../../components/homepage/Hero"
import Navbar from "../../components/navigation/Navbar"

function Homepage() {
  return (
    <section>
      <Navbar isAuthenticated={false}/>
      <Hero/>
    </section>
  )
}

export default Homepage