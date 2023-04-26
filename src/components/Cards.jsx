import React, { useState } from "react";
import '../style/Cards.css';

const projectCardList = [
    {
      "title": "Gridiron Guru",
      "description": "A comprehensive NFL statistics application that provides extensive access to historical data from 1938 to the present day. Built on the React framework, this app delivers a highly responsive and user-friendly browsing experience for both casual viewers and sports analysts.",
      "image": "https://images.unsplash.com/photo-1611000273610-f4fb9c7fd0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YW1lcmljYW4lMjBmb290YmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "href": "/nflstats"
    },
    {
      "title": "E-Commerce Website",
      "description": "Offers a wide range of products from various categories, all available through a neat-looking user-friendly interface.",
      "image": "https://www.aivanet.com/wp-content/uploads/2019/12/technology-gadgets-card-game-100-cool-tech-in-2019-best-products-you-need.jpg",
      "href": "/ecommerce"
    },
    {
      "title": "Snake",
      "description": "Play Snake.",
      "image": "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fFNuYWtlJTIwZ2FtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "href": "https://github.com/jacehalvorson/snake"
    }
];

function Card( props )
{
  return (
    <div className="card-wrapper" onMouseOver={ props.mouseOverFunction }>
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

function Cards( )
{
  const [ activeIndex, setActiveIndex ] = useState( 0 );

  return (
    <main id="cards-main">
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