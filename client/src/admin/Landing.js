import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import QLDonHang from "./pages/QLDonHang"
const Landing = () => {
    return <>
        
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="login" element= {<Login />} />
            <Route path="quanLyDonHang" element={<QLDonHang />} /> 
            <Route path="*" element={<div>admin page</div>} />
        </Routes>
    </>
}

export default Landing