import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import React, { Component } from 'react';
class Landing extends Component {
    render() {
        return (
                    <Routes>
                     <Route index element={<Home />} />
                     <Route path="/auth" element={<Auth/>} />
                    </Routes>
        );
    }
}

export default Landing