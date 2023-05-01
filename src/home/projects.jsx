import React from 'react';
import projectCardList from "../utils/projectCardList.js";
import './projects.css';

function Card( props )
{
  return (
    <div className="card-wrapper">
      <div className="card" id={ props.id }>
        <div
          className="card-background"
          style={{backgroundImage: `linear-gradient( rgba( 0, 0, 0, 0.3 ), rgba( 0, 0, 0, 0.3 ) ), url( ${ props.image } )` }}>
        </div>
        <h2 className="card-title">{ props.title }</h2>
        <p className="card-text">{ props.description }</p>
        <a href={ props.href }>
          <button className="card-button">Check it out</button>
        </a>
      </div>
      <div className="card-border"></div>
    </div>
  )
}

function Projects( props )
{
   return (
      <div id="projects-wrapper">
        <h1 id="cards-title">Projects</h1>
        <div id="menu">
          <div id="menu-items">
            {
              ( projectCardList )
              ? ( projectCardList.map( ( card, cardIndex ) => 
                (
                  <Card
                    title={ card.title }
                    description={ card.description }
                    image={ card.image }
                    href={ card.href }
                  />
                ) ) )
              : ( <div></div> )
            }
          </div>
        </div>
      </div>
   )
}

export default Projects;