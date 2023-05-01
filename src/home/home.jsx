import React, { useState } from "react";
import About from "./about.jsx";
import Timeline from "./timeline.jsx";
import Projects from "./projects.jsx";
import './home.css';

function MenuBackground( props )
{
  return (
    <>
      <div
        id="background-pattern"
        style={{ backgroundPosition: `${ ( props.activeIndex * -25 ) }% 0%` }}
      />

      <div
        id="background-picture"
        style={{ backgroundPosition: `${ ( props.activeIndex * 2 ) }% 40%` }}  
      />
    </>
  )
}

function Home( )
{
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  return (
    <main id="home">
      <div id="home-header">
        <i className="fas fa-arrow-left home-arrow-icon" id="menu-icon" onClick={ ( ) => setActiveIndex( ( activeIndex - 1 ) % 3 ) }></i>
        <h1 id="home-title">Projects</h1>
        <i className="fas fa-arrow-right home-arrow-icon" id="menu-icon" onClick={ ( ) => setActiveIndex( ( activeIndex + 1 ) % 3 ) }></i>
      </div>

      <div id="home-content">
        <Projects />
        <About />
        <Timeline />
      </div>

      <MenuBackground activeIndex={activeIndex} />
    </main>
  );
}

export default Home;