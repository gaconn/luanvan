//components
import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import HomeComponet from '../components/Home'

const Home  = () => {
    return <>
    <Header/>  
    <NavbarHeader/>    
    <Section/>
    <Banner/>
    <HomeComponet/>
    <Footer/>
    </>
}

export default Home