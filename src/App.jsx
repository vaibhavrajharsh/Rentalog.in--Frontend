
import "./App.css";
import Contact from "./components/Contact-section/Contact";
import Header from "./components/Header-section/Header";


import './App.css'
import Footer from './components/Footer-section/Footer'
import Header from './components/Header-section/Header'
import Connect from './components/connectUs-section/Connect'
import AboutUs from './components/AboutUs-section/AboutUs';
import Services from './components/Services-section/Services-section';

const App = () => {
  return (
    <>
      <Header />
      <Contact />
      <Services />
      <AboutUs />
      <Connect />
      <Footer />
    </>
  );
};

export default App;
