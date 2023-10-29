import React, { useState } from 'react';
import './conway.css'
import { Stage, Graphics, Container } from '@pixi/react';

const CELL_WIDTH = 50;
const CELL_HEIGHT = 50;
const NUM_ROWS = 10;
const NUM_COLS = 10;
const X_OFFSET = 2;
const Y_OFFSET = 6;

function getRandomBoard( )
{
   return Array.from({ length: NUM_ROWS }, ( ) =>
      Array.from({ length: NUM_COLS }, ( ) => ( Math.random() > 0.5 ) )
   );
}

function Conway( )
{
   const [ gameBoard, setGameBoard ] = useState( [] );

   return (
      <main id="conway">
         <Stage
            width={ NUM_COLS * CELL_WIDTH }
            height={ NUM_ROWS * CELL_HEIGHT }
            interactive={true}
            interactivechildren='true'
         >
            <GameBoard
               gameBoard={ gameBoard }
               setGameBoard={ setGameBoard }
               handleCellClick={ handleCellClick }/>
         </Stage>

         <div className="fab-container">
            <button
               className="fab"
               onClick={ () => 
               {
                  setGameBoard( getRandomBoard( ) );
               }}
            >
               Randomize
            </button>
         </div>
      </main>
   );
}

function handleCellClick(pointerX, pointerY, gameBoard, setGameBoard)
{
   let rowIndex = Math.floor( pointerY / CELL_HEIGHT );
   let colIndex = Math.floor( pointerX / CELL_WIDTH );
   
   let updatedGameBoard = [ ...gameBoard ];
   updatedGameBoard[ rowIndex ][ colIndex ] = !updatedGameBoard[ rowIndex ][ colIndex ];
   setGameBoard( updatedGameBoard );
};

function GameBoard( props )
{
   if ( !props.gameBoard ||
         props.gameBoard.length === 0 )
   {
      return <></>;
   }

   return props.gameBoard.map( ( row, rowIndex ) =>
   {
      return row.map( ( cell, colIndex ) =>
      {
         const x = colIndex * CELL_WIDTH;
         const y = rowIndex * CELL_HEIGHT;
         let cellColor;

         if ( props.gameBoard[rowIndex][colIndex] === undefined )
         {
            // On error, show red cell
            console.log(`undefined ${rowIndex} ${colIndex}`);
            cellColor = 0xff0000;
         }
         else
         {
             // Black for true, white for false
            cellColor = cell ? 0x000000 : 0xffffff;
         }

         return <Container
            key={`cell-${rowIndex}-${colIndex}`}
            x={x}
            y={y}
            interactive={true}
            pointerdown={() => {props.handleCellClick(x, y, props.gameBoard, props.setGameBoard)}}
         >
            <Graphics
               draw={graphics => {
                  graphics.clear( );
                  graphics.beginFill( cellColor );
                  graphics.drawRect( 0, 0, CELL_WIDTH, CELL_HEIGHT );
                  graphics.endFill( );
               }}
            />
         </Container>
      });
   });
         
}

export default Conway;