import React, { useState, useEffect } from "react";

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

function Cards( )
{
  const [ cardList, setcardList ] = useState( [ ] );

  useEffect( ( ) =>
  {
    fetch( '/project_cards.json' )
        .then( response => response.json( ) )
        .then( json => setcardList( json.projectCards ) )
        .catch( err => console.error( err ) )
  }, [ ] );

  return (
    <div id="menu">
      <div id="menu-items">
        {
          cardList.map( ( card ) => 
          (
            <Card
              title={ card.title }
              description={ card.description }
              id={ card.id }
              href={ card.href }
            />
          ))
        }
      </div>

      <div id="menu-background-pattern" />
      <div id="menu-background-picture" />
    </div>
  );
}

export default Cards;