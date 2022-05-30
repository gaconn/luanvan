
import { useEffect, useState } from "react"
import SideBar from "../layouts/SideBar"
import NhaCungCap from "./NhaCungCap"
const Home = () => {
    return <div className="d-flex">
        <SideBar/>
        <div className="flex-fill">
            <NhaCungCap/>
        </div>
}

export default Home 