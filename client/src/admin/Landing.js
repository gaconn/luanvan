import Home from "./pages/Home"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import React, { Component } from 'react';
class Landing extends Component {
    render() {
        return (
                    <Routes>
                     <Route index element={<Home />} />
                     <Route path="login" element={<Login />} />
                    </Routes>
        );
    }
}

export default Landing;