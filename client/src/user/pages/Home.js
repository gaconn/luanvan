//components
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import HomeComponet from '../components/Home'
import Loading from "../layouts/Loading"
const Home = () => {
   
    return<>
     <Loading/>
    <Header />
    <NavbarHeader />
    <Section />
    <Banner />
    <HomeComponet />
    <Footer />  
    </>
}

export default Home