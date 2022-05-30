import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import QLDonHang from "./pages/QLDonHang"
import ProtectedPage from "./services/utils/ProtectedPage"
import SideBar from "./layouts/SideBar"
import Main from "./pages"
const Landing = () => {
    return <>
        
        <Routes>
            <Route path="auth" element= {<Auth />} />
            <Route element={<ProtectedPage />}>
                <Route path="admin">
                    <Route path=":manage">
                        <Route path=":option" element={<Main/>} />
                        <Route path="*" element={<div>option not found</div>} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<div>admin page</div>} />
        </Routes>
    </>

}

export default Landing