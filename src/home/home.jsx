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
      {/* Left arrow icon */}
      <svg
        id="home-arrow-left"
        className="home-arrow-icon"
        onClick={ ( ) => { changeSectionIndex( sectionIndex, setSectionIndex, "prev", numSections ); }}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        >
        <path d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"/>
      </svg>

      {/* Title */}
      <h1 id="home-title">
        { titleArray[ sectionIndex ] }
      </h1>

      {/* Right arrow icon */}
      <svg
        id="home-arrow-right"
        className="home-arrow-icon"
        onClick={ ( ) => { changeSectionIndex( sectionIndex, setSectionIndex, "next", numSections ); }}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
      </svg>
    </div>
  )
}

function Home( )
{
  const [ sectionIndex, setSectionIndex ] = useState( PROJECTS_INDEX );
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