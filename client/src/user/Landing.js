import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import React, { Component } from 'react';
//  import "./assets/css/bootstrap.min.css"  
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
import Shop from "./pages/Shop"
import Blog from "./pages/Blog"
import Checkout from "./pages/Checkout";
import {WOW} from 'wowjs'
class Landing extends Component {
    componentDidMount() {
        const wow = new WOW({ 
            
                boxClass:     'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset:       0,          // distance to the element when triggering the animation (default is 0)
                mobile:       true,       // trigger animations on mobile devices (default is true)
                live:         false,       // act on asynchronously loaded content (default is true)
                callback:     function(box) {
                  // the callback is fired every time an animation is started
                  // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
              

         }); // disables sync requirement
        wow.init()
    }
    render() {
        return (
                    <Routes>
                    <Route index element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Shop" element={<Shop/>}/>
                    <Route path="/CheckOut" element={<Checkout/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                    <Route path="/Blog" element={<Blog/>}/>
                    </Routes>
        );
    }
}

export default Landing