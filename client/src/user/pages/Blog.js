import Footer from "../layouts/Footer/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import BlogComponent from '../components/Blog'
const Blog = () => {
    return (<>
        <Header />
        <NavbarHeader />
        <Section />
        <Banner />
        <BlogComponent/>
        <Footer />
    </>);
}

export default Blog;