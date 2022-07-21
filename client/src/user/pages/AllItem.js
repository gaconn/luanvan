
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"


const AllItem = () => {
 
    return (
    <>
        <Header />
        <NavbarHeader />
        <Section />
        <Outlet />
    </>
    );
}

export default AllItem;
