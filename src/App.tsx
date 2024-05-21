import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import Home from './pages/home'


function App() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const theme = localStorage.getItem('mode');
    return theme ? theme === 'light' : true; // Default to light mode if no preference is set
  });

  useEffect(() => {
    if (isLightMode) {
      localStorage.setItem('mode', 'light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else {
      localStorage.setItem('mode', 'dark');
      document.body.style.backgroundColor = '#0B0E13';
      document.body.style.color = 'white';
    }
  }, [isLightMode]);

  useEffect(() => {
    const theme = localStorage.getItem('mode');
    if (theme === 'light') {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else if (theme === 'dark') {
      document.body.style.backgroundColor = '#0B0E13';
      document.body.style.color = 'white';
    }
  }, []);


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
