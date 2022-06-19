import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import BlogComponent from '../components/Blog'
import Loading from "../layouts/Loading"
const Blog = () => {
    return (<>
        <Loading/>
        <Header />
        <NavbarHeader />
        <Section />
        <Banner />
        <BlogComponent/>
        <Footer />
    </>);
}

export default Blog;