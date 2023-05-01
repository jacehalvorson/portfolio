import React, { useState } from "react";
import About from "./about.jsx";
import Timeline from "./timeline.jsx";
import Projects from "./projects.jsx";
import './home.css';

const numSections = 3;
export const ABOUT_INDEX = 0;
export const PROJECTS_INDEX = 1;
export const TIMELINE_INDEX = 2;

function MenuBackground( props )
{
  return (
    <>
      <div
        id="background-pattern"
        style={{ backgroundPosition: `${ ( props.activeIndex * -90 ) }% 0%` }}
      />

      <div
        id="background-picture"
        style={{ backgroundPosition: `${ ( props.activeIndex * 20 ) }% 40%` }}  
      />
    </>
  )
}

function HomeHeader( props )
{
  const titleArray = [ "About", "Projects", "Timeline" ];
  const [ activeIndex, setActiveIndex ] = [ props.activeIndex, props.setActiveIndex ];

  return (
    <div id="home-header">
      <i className="fas fa-arrow-left home-arrow-icon"
          onClick={ ( ) => {
          if ( activeIndex > 0 ) {
            setActiveIndex( ( activeIndex - 1 ) );
          }
          }}
      />
      <h1 id="home-title">
        { titleArray[ activeIndex ] }
      </h1>
      <i className="fas fa-arrow-right home-arrow-icon"
          onClick={ ( ) => {
          if ( activeIndex < ( numSections - 1 ) ) {
            setActiveIndex( ( activeIndex + 1 ) );
          }
          }}
      />
    </div>
  )
}

function Home( )
{
  const [ activeIndex, setActiveIndex ] = useState( 1 );

  return (
    <main id="home">
      <HomeHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

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