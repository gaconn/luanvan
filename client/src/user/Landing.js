import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

import React, { Component } from 'react';
 import "./assets/css/bootstrap.min.css"  
 import "./assets/css/font-awesome.min.css"  
 import "./assets/css/elegant-icons.css"  
 import "./assets/css/nice-select.css"  
 import "./assets/css/jquery-ui.min.css"  
 import "./assets/css/owl.carousel.min.css"  
 import "./assets/css/slicknav.min.css"  
 import "./assets/css/style.css"  
import Login from "./pages/Login";
class Landing extends Component {
    render() {
        return (
                    <Routes>
                     <Route index element={<Home />} />
                    <Route path="Login" element={<Login/>}/>
                    </Routes>
        );
    }
}

export default Landing