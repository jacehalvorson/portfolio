import React from 'react';
import projectCardList from "../utils/projectCardList.js";
import { getSectionWrapperClassNames } from "../utils/sectionIndexUtils.js";
import { PROJECTS_INDEX } from "./home.jsx";
import './projects.css';

function Card( props )
{
  return (
    <div className="card-wrapper"
         onMouseOver={ ( ) => props.setProjectsHovered( true ) }
         onMouseLeave={ ( ) => props.setProjectsHovered( false ) }>
      <div className="card">
        <div
          className="card-background"
          // Add this card's image as a background image with 0.4 opacity
          style={{ backgroundImage: `linear-gradient( rgba( 0, 0, 0, 0.4 ), rgba( 0, 0, 0, 0.4 ) ), url( ${ props.image } )` }}
        />
        <h2 className="card-title">{ props.title }</h2>
        <p className="card-text">{ props.description }</p>
        <a href={ props.href }>
          <button className="card-button">Check it out</button>
        </a>
      </div>
      {/* Glowing border with color changes, too slow for production
       <div className="card-border"></div> */}
    </div>
  )
}

function Projects( props )
{
  return (
    <div id="projects-wrapper" className={ getSectionWrapperClassNames( props.sectionIndex, PROJECTS_INDEX ) } style={{ position: "relative" }}>
      <div id="projects-content">
        <div id="menu-items">
          {
            ( projectCardList )
            ? ( projectCardList.map( ( card ) => 
              (
                <Card
                  title={ card.title }
                  description={ card.description }
                  image={ card.image }
                  href={ card.href }
                  setProjectsHovered={ props.setProjectsHovered }
                />
              ) ) )
            : ( <></> )
          }
        </div>
      </div>
    </div>
  )
}

export default Projects;