<<<<<<< HEAD
import { useEffect, useState } from "react"
import SideBar from "../layouts/SideBar"
import NhaCungCap from "./NhaCungCap"
=======
import Content from '../layout/content/content';
import Sidebar from '../layout/sidebar/sidebar';
import Topbar from '../layout/topbar/topbar';
import Footer from '../layout/footer/footer';
import Modal from '../layout/modal/modal'
>>>>>>> 5de9fb2c03451101f0d47a88a2ac23210d7bef67
const Home = () => {
    return <div className="d-flex">
        <SideBar/>
        <div className="flex-fill">
            <NhaCungCap/>
        </div>
    </div>

}

export default Home 