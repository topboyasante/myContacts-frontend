import Hero from "../../components/homepage/Hero"
import Footer from "../../components/navigation/Footer"
import Navbar from "../../components/navigation/Navbar"

function Homepage() {
  return (
    <section>
      <Navbar isAuthenticated={false}/>
      <Hero/>
      <Footer/>
    </section>
  )
}

export default Homepage