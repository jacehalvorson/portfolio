import React, { useState, useEffect } from "react";
import ReadJSONAndExecuteSetter from "./utils.js";

const projectCardFileName = "/project_cards.json";

function Card( props )
{
  return (
    <div className="card-wrapper">
      <div className="card" id={ props.id } onClick={ ( ) => { window.open( props.href ) } } >
          <h2 className="card-title">{ props.title }</h2>
          <p className="card-text">{ props.description }</p>
      </div>
      <div className="card-border"></div>
    </div>
  )
}

function Cards( props )
{
  const [ cardsDict, setCardsDict ] = useState( { } );
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  useEffect( ( ) =>
  {
    // Read the project card list from the JSON file
    ReadJSONAndExecuteSetter( projectCardFileName, setCardsDict );
    console.log( "Reading project cards from " + projectCardFileName + ": " );
    console.log( cardsDict );

    var menuItems = document.getElementsByClassName( "card-wrapper" );
    for ( var i = 0; i < menuItems.length; i++ )
    {
      (function( index )
      {
          menuItems[ index ].addEventListener( "mouseover", function(){ setActiveIndex( index ) } );
      })( i );
    }
  }, [ ] );

  return (
    <div id="menu">
      <div id="menu-items">
        {
          ( cardsDict.projectCards )
          ? ( cardsDict.projectCards.map( ( card ) => 
            (
              <Card
                title={ card.title }
                description={ card.description }
                id={ card.id }
                href={ card.href }
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
  );
}

export default Cards;