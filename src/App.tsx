import React from 'react';
import './App.css';
import Navbar from './views/navbar/Navbar';
import First from './views/first/First';
import Decoration from './components/decoration/Decoration';
import Quote from './views/quote/Quote';
import Project from './views/projects/Project';
import Skill from './views/skills/Skill';
import AboutMe from './views/about/Aboutme';
import Contact from './views/contact/Contact';

function App() {
  return (
    <div className='flex justify-center w-[1366px] relative'>
      <Decoration />
      <div className="w-[1024px]">
        <Navbar />
        <First />
        <Quote />
        <Project />
        <Skill />
        <AboutMe />
        <Contact />
      </div>
    </div>
  );
}

export default App;
