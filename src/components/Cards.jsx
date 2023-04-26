import React, { useState, useEffect } from "react";
import { ReadJSONAndExecuteSetter } from "../utils.js";
import '../style/Cards.css';

const projectCardFileName = "/project_cards.json";

function Card( props )
{
  return (
    <div className="card-wrapper" onMouseOver={ props.mouseOverFunction }>
      <div className="card" id={ props.id }>
        <div
          className="card-background"
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url( ${ props.image } )` }}>
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

function Cards( )
{
  const [ cardsDict, setCardsDict ] = useState( { } );
  const [ activeIndex, setActiveIndex ] = useState( 0 );
  
  useEffect( ( ) =>
  {
    // Read the project card list from the JSON file
    ReadJSONAndExecuteSetter( projectCardFileName, setCardsDict );
  }, [ ] );

  return (
    <main id="cards-main">
      <h1 id="cards-title">Projects</h1>
      <div id="menu">
        <div id="menu-items">
          {
            ( cardsDict.projectCards )
            ? ( cardsDict.projectCards.map( ( card, cardIndex ) => 
              (
                <Card
                  title={ card.title }
                  description={ card.description }
                  image={ card.image }
                  href={ card.href }
                  mouseOverFunction={ function( ){ setActiveIndex( cardIndex ) } }
                />
              ) ) )
            : ( <div></div> )
          }
        </div>

        <div
          id="menu-background-pattern"
          style={{ backgroundPosition: `${ ( activeIndex * -25 ) - 25 }% 0%` }}
        />
        <div id="menu-background-picture" />
      </div>
    </main>
  );
}

export default Cards;