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
        id="menu-background"
        style={{ backgroundPosition: `${ ( props.activeIndex * -25 ) - 25 }% 0%` }}
      />

      <div id="menu-background-picture" />
    </>
  )
}

function Home( )
{
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  return (
    <main id="home-main">
      <Projects />
      <About />
      <Timeline />

      <MenuBackground activeIndex={activeIndex} />
    </main>
  );
}

export default Home;