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
import Contact from "./pages/Contact";
import Register from "./pages/Register";
class Landing extends Component {
    render() {
        return (
                    <Routes>
                    <Route index element={<Home />} />
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Shop" element={<Login/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                    <Route path="/Blog" element={<Contact/>}/>
                    </Routes>
        );
    }
}

export default Landing