// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // <-- added
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Games from './pages/games';
import BlogPage from './pages/blog';

type SectionRefs = {
  home: HTMLElement | null;
  about: HTMLElement | null;
  projects: HTMLElement | null;
  games: HTMLElement | null;
  contact: HTMLElement | null;
  blog: HTMLElement | null;
};

const App: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    const theme = localStorage.getItem('mode');
    return theme ? theme === 'light' : true;
  });

  const sectionRefs = useRef<SectionRefs>({
    home: null,
    about: null,
    projects: null,
    games: null,
    contact: null,
    blog: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.history.pushState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.7 }
    );

    const { home, about, projects, games, contact, blog } = sectionRefs.current;
    const sections = [home, about, projects, games, contact, blog];
    
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

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
    <Routes>
      {/* Main scrolling sections route */}
      <Route
        path="/"
        element={
          <>
            <Navbar isLightMode={isLightMode} toggleColorMode={toggleColorMode} />
            <div id="home" ref={(el) => (sectionRefs.current.home = el)}>
              <Home isLightMode={isLightMode} />
            </div>
            <div id="about" ref={(el) => (sectionRefs.current.about = el)}>
              <About isLightMode={isLightMode} />
            </div>
            <div id="projects" ref={(el) => (sectionRefs.current.projects = el)}>
              <Projects isLightMode={isLightMode} />
            </div>
            <div id="games" ref={(el) => (sectionRefs.current.games = el)}>
              <Games isLightMode={isLightMode} />
            </div>
            <Footer isLightMode={isLightMode} />
          </>
        }
      />

      {/* Blog route */}
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
};

export default App;
