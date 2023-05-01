import React, { useState } from "react";
import About from "./about.jsx";
import Timeline from "./timeline.jsx";
import Projects from "./projects.jsx";
import './home.css';

const numSections = 3;

function MenuBackground( props )
{
  return (
    <>
      <div
        id="background-pattern"
        style={{ backgroundPosition: `${ ( props.activeIndex * -100 ) }% 0%` }}
      />

      <div
        id="background-picture"
        style={{ backgroundPosition: `${ ( props.activeIndex * 5 ) }% 40%` }}  
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
        <i className="fas fa-arrow-left home-arrow-icon"
           onClick={ ( ) => {
            if ( activeIndex > 0 ) {
              setActiveIndex( ( activeIndex - 1 ) );
            }
           }}
        />
        <h1 id="home-title">Projects</h1>
        <i className="fas fa-arrow-right home-arrow-icon"
           onClick={ ( ) => {
            if ( activeIndex < ( numSections - 1 ) ) {
              setActiveIndex( ( activeIndex + 1 ) );
            }
           }}
        />
      </div>

      <div id="home-content">
        <Projects activeIndex={activeIndex} />
        <About activeIndex={activeIndex} />
        <Timeline activeIndex={activeIndex} />
      </div>

      <MenuBackground activeIndex={activeIndex} />
    </main>
  );
}

export default Home;