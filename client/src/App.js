//style
import './App.css';
import "./assets/styles/bootstrap.min.css"
import "./assets/styles/fontawesome.min.css"
import "./assets/styles/slick-theme.min.css"
import "./assets/styles/slick.min.css"
// import "./assets/styles/templatemo.min.css"

//libraries
import {BrowserRouter , Routes, Route} from "react-router-dom"

//admi
import AdminLanding  from "./admin/Landing"
//user
import Landing from './pages/Landing';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Auth from './pages/Auth';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/manage/*' element={<AdminLanding />}/>
        <Route path='/' element={<Home />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path='*' element= {<div>Nothing here</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
