//components
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import CheckoutComponent from '../components/CheckOut'
const Checkout = () => {
    return ( 
        <>
    <Header/>  
    <NavbarHeader/>    
    <Section/>
    <Banner/>
    <CheckoutComponent/>
    <Footer/>
    </>
     );
}
 
export default Checkout;