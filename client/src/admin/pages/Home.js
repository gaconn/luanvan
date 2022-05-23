import React from 'react';

import Content from '../layout/content/content';
import Sidebar from '../layout/sidebar/sidebar';
import Topbar from '../layout/topbar/topbar';
import Footer from '../layout/footer/footer';
import Modal from '../layout/modal/modal'
const Home = () => {
  return (
<div>
<div id="wrapper">
        <Sidebar/>
         <div id="content-wrapper" className="d-flex flex-column">
             <div id="content">
                 <Topbar/>
                 <Content/>
                 <Footer/>
                 
             </div>
         </div>

     </div>
<Modal/>
    
</div>
  


  )
}

export default Home 