import React, { useState } from "react";
import About from "./about.jsx";
import Timeline from "./timeline.jsx";
import Projects from "./projects.jsx";
import { changeSectionIndex } from "../utils/sectionIndexUtils.js";
import './home.css';

export const numSections = 3;
export const ABOUT_INDEX = 0;
export const PROJECTS_INDEX = 1;
export const TIMELINE_INDEX = 2;

function MenuBackground( props )
{
  return (
    <>
      <div
        id="background-pattern"
        style={{ backgroundPosition: `${ ( props.sectionIndex * -25 ) }% 0%` }}
      />

      <div
        id="background-picture"
        style={{ backgroundPosition: `${ ( props.sectionIndex * 20 ) }% 40%` }}  
      />
    </>
  )
}

function HomeHeader( props )
{
  const titleArray = [ "About", "Projects", "Experience" ];
  const [ sectionIndex, setSectionIndex ] = [ props.sectionIndex, props.setSectionIndex ];

  return (
    <div id="home-header">
      <i id="home-arrow-left"
          className="fas fa-arrow-left home-arrow-icon unclickable"
          onClick={ ( ) => { changeSectionIndex( sectionIndex, setSectionIndex, "prev", numSections ); }}
      />
      <h1 id="home-title">
        { titleArray[ sectionIndex ] }
      </h1>
      <i id="home-arrow-right"
          className="fas fa-arrow-right home-arrow-icon"
          onClick={ ( ) => { changeSectionIndex( sectionIndex, setSectionIndex, "next", numSections ); }}
      />
    </div>
  )
}

function Home( )
{
  const [ sectionIndex, setSectionIndex ] = useState( ABOUT_INDEX );
  const [ projectHoverIndex, setProjectHoverIndex ] = useState( -1 );

  return (
    <main id="home">
      <HomeHeader
        sectionIndex={sectionIndex}
        setSectionIndex={setSectionIndex}
        projectHoverIndex={projectHoverIndex}
      />

      <div id="home-content">
        <Projects sectionIndex={sectionIndex} setProjectHoverIndex={setProjectHoverIndex} />
        <About sectionIndex={sectionIndex} />
        <Timeline sectionIndex={sectionIndex} />
      </div>

      <MenuBackground sectionIndex={sectionIndex} />
    </main>
  );
}

export default Home;