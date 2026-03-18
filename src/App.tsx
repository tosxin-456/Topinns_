import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/footer';
import Navbar from './components/navbar';

import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Games from './pages/games';

import BlogPage from './pages/blog';
import BlogPostPage from './pages/single blog';
import ChessBlog from './components/chessblog';

type SectionRefs = {
  home: HTMLElement | null;
  about: HTMLElement | null;
  projects: HTMLElement | null;
  games: HTMLElement | null;
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
  });

  // Scroll hash updater (ONLY for homepage)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.7 }
    );

    Object.values(sectionRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Theme handling
  useEffect(() => {
    const theme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('mode', theme);

    document.body.style.backgroundColor =
      theme === 'light' ? 'white' : '#0B0E13';
    document.body.style.color =
      theme === 'light' ? 'black' : 'white';
  }, [isLightMode]);

  const toggleColorMode = () => {
    setIsLightMode(prev => !prev);
  };

  // Homepage layout separated (IMPORTANT)
  const HomeLayout = () => (
    <>
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
  );

  return (
    <>
      <Navbar isLightMode={isLightMode} toggleColorMode={toggleColorMode} />

      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomeLayout />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage isLightMode={isLightMode} />} />
        <Route path="/blog/:id" element={<BlogPostPage isLightMode={isLightMode} />} />

        {/* Chess blog */}
        <Route path="/chess-blog" element={<ChessBlog />} />
      </Routes>
    </>
  );
};

export default App;