import React, { useState, useEffect } from 'react';
import './conway.css'
import { Stage, Container, Graphics } from '@pixi/react';

const CELL_WIDTH = 50;
const CELL_HEIGHT = 50;
const NUM_ROWS = 10;
const NUM_COLS = 10;

function getRandomBoard( )
{
   return Array.from({ length: NUM_ROWS }, ( ) =>
      Array.from({ length: NUM_COLS }, ( ) => ( Math.random() > 0.5 ) )
   );
}

function Conway( )
{
   const [ gameBoard, setGameBoard ] = useState( getRandomBoard( ) );
   
   return (
      <main id="conway">
         <Stage width={ NUM_COLS * CELL_WIDTH } height={ NUM_ROWS * CELL_HEIGHT }>
         {
            ( !gameBoard )
            ? <Container />
            : gameBoard.map( ( row, rowIndex ) =>
            {
               return (
                  <Container key={ rowIndex }>
                  {
                     row.map( ( cell, cellIndex ) =>
                     {
                        return (
                           <Graphics
                              key={cellIndex}
                              x={cellIndex * CELL_WIDTH}
                              y={rowIndex * CELL_HEIGHT}
                              draw={graphics => {
                                 graphics.clear();
                                 const cellColor = cell ? 0x000000 : 0xffffff; // Black or white
                                 graphics.beginFill(cellColor);
                                 graphics.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
                                 graphics.endFill();
                              }}
                           />
                        );
                     })
                  }
                  </Container>
               );
            })
         }
         </Stage>

         <div className="fab-container">
            <button
               className="fab"
               onClick={ () => 
               {
                  console.log( "Randomize");
                  setGameBoard( getRandomBoard( ) );
               }}
            >
               Randomize
            </button>
         </div>
      </main>
   );
}

export default Conway;