import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import ShopComponent from "../components/Shop"
const Shop = () => {
    return (
        <>
            <Header />
            <NavbarHeader />
            <Section />
            <Banner />
            <ShopComponent/>
            <Footer />
        </>
    );
}

export default Shop;