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
        style={{ backgroundPosition: `${ ( props.sectionIndex * -25 ) }% 0%`,
                 opacity: `${ ( props.projectHoverIndex > 0 ) ? 0.5 : 1 }`,
                 backgroundSize: `${ ( props.projectsHovered ) ? "10.5vmin 10.5vmin" : "11vmin 11vmin" }` }}
      />

      <div
        id="background-picture"
        style={{ backgroundPosition: `${ ( props.sectionIndex * 33 ) }% center`,
                 opacity: `${ ( props.projectsHovered ) ? 0.35 : 0.3 }`, }}  
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
  const [ projectsHovered, setProjectsHovered ] = useState( false );

  return (
    <main id="home">
      <HomeHeader sectionIndex={sectionIndex} setSectionIndex={setSectionIndex} />

      <div id="home-content" style={{ left: `${ sectionIndex * -100 + 100 }%` }}>
        <About />
        <Projects setProjectsHovered={setProjectsHovered} />
        <Timeline />
      </div>

      <MenuBackground sectionIndex={sectionIndex} projectsHovered={projectsHovered} />
    </main>
  );
}

export default Home;