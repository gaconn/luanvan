//style
import './App.css';
import "./user/assets/styles/bootstrap.min.css"
import "./user/assets/styles/fontawesome.min.css"
import "./user/assets/styles/slick-theme.min.css"
import "./user/assets/styles/slick.min.css"
// import "./assets/styles/templatemo.min.css"

//libraries
import {BrowserRouter , Routes, Route} from "react-router-dom"

//admi
import AdminLanding  from "./admin/Landing"
//user
function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/manage/*' element={<AdminLanding />}/>
        <Route path='/*' element={<UserLanding />} />
        {/* <Route path="/auth" element={<Auth/>} /> */}
        <Route path='*' element= {<div>Nothing here</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
