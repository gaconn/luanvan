import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
const Landing = () => {
    return <>
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="login" element= {<Login />} />
        </Routes>
    </>
}

export default Landing