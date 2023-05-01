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
        style={{ backgroundPosition: `${ ( props.activeIndex * -25 ) - 25 }% 0%` }}
      />

      <div id="background-picture" />
    </>
  )
}

function Home( )
{
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  return (
    <main id="home">
      <Projects />
      <About />
      <Timeline />

      <MenuBackground activeIndex={activeIndex} />
    </main>
  );
}

export default Home;