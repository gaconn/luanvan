import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import QLDonHang from "./pages/QLDonHang"
import ProtectedPage from "./services/utils/ProtectedPage"
const Landing = () => {
    return <>
        
        <Routes>
            <Route path="auth" element= {<Auth />} />
            <Route element={<ProtectedPage />}>
                <Route path="home" element={<Home />} />
                <Route path="quanLyDonHang" element={<QLDonHang />} />     
            </Route>
            <Route path="*" element={<div>admin page</div>} />
        </Routes>
    </>
}

export default Landing