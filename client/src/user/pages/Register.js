import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import RegisterComponent from '../components/Register'
const Register = () => {
    return (
        <>
            <Header />
            <NavbarHeader />
            <Section />
            <RegisterComponent/>
            <Footer />
        </>
    );
}

export default Register;