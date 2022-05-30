import Header from "../layouts/Header";
import Footer from "../layouts/Footer/Footer"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import ContactComponent from '../components/Contact'
const Contact = () => {
    return (
        <div>
            <Header />
            <NavbarHeader />
            <Section />
            <ContactComponent/>
            <Footer />
        </div>

    );
}

export default Contact;