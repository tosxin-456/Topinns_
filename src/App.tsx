import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import Home from './pages/home'


function App() {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if (isLightMode) {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else {
      document.body.style.backgroundColor = '#0B0E13';
      document.body.style.color = 'white';
    }
  }, [isLightMode]);

  const toggleColorMode = () => {
    setIsLightMode(prevMode => !prevMode);
  };
  
  return (
    <>
      <div>
       <Navbar isLightMode={isLightMode} toggleColorMode={toggleColorMode}/>
       <Home isLightMode={isLightMode}/>
       <Footer isLightMode={isLightMode}/>
      </div>
    </>
  )
}

export default App
