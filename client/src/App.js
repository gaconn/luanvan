//style
import './App.css';

//libraries
import {BrowserRouter , Routes, Route} from "react-router-dom"

//admi
import AdminLanding  from "./admin/Landing"
//user
import UserLanding  from "./user/Landing"
function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
      <Route path='/manage/*' element={<AdminLanding />}/>
        <Route path='/*' />
        {/* <Route path="/auth" element={<Auth/>} /> */}
=======
        <Route path='/manage/*' element={<AdminLanding />}/>
        <Route path='/*' element={<UserLanding/>} />
>>>>>>> ef4be753d756739df553452b680cc910b39ab840
        <Route path='*' element= {<div>Nothing here</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
