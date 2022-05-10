import './App.css';

//layout
import NavBar from './layouts/NavBar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Banner from './layouts/Banner';

//style
import "./assets/styles/bootstrap.min.css"
import "./assets/styles/fontawesome.min.css"
import "./assets/styles/slick-theme.min.css"
import "./assets/styles/slick.min.css"
import "./assets/styles/templatemo.min.css"
function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
