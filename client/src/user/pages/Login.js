import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Auth from "../components/Authenticate"

const Login = () => {
    return (
        <div>
            <Header />
            <NavbarHeader />
            <Section />
            <Auth />
            <Footer />
        </div>
    );
}

export default Login;