import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';

const CELL_WIDTH = 50;
const CELL_HEIGHT = 50;
const NUM_ROWS = 20;
const NUM_COLS = 40;
const CELL_BORDER_WIDTH = 1;

function getRandomBoard( )
{
   return Array.from({ length: NUM_ROWS }, ( ) =>
      Array.from({ length: NUM_COLS }, ( ) => ( Math.random() > 0.5 ) )
   );
}

function Conway( )
{
   const [ gameBoard, setGameBoard ] = useState( [] );
   const [ isPaused, setIsPaused ] = useState( false );

   function handleKeyPress( e )
   {
      if ( e.key === ' ' || e.key === 'Spacebar' )
      {
         setIsPaused( previousValue => !previousValue );
      }
   }

   useEffect( ( ) =>
   {
      let interval = setInterval( ( ) =>
      {
         setGameBoard( getRandomBoard( ) );
         if ( !isPaused )
         {
            setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
            console.log( 'Play' );
         } 
         else
         {
            console.log( 'Paused' );
         }
      }, 1000 );

      return ( ) =>
      {
         clearInterval( interval );
      }
   }, [ ] );

   return (
      <main id="conway" onKeyDown={handleKeyPress} tabIndex={ 0 }>
         <Stage
            width={ NUM_COLS * CELL_WIDTH }
            height={ NUM_ROWS * CELL_HEIGHT }
         >
            <Layer>
               <GameBoard
                  gameBoard={ gameBoard }
                  setGameBoard={ setGameBoard }
               />
            </Layer>
         </Stage>

         <div className="fab-container">
            <button
               className="fab"
               onClick={ ( ) => 
               {
                  setGameBoard( getRandomBoard( gameBoard ) );
               }}
            >
               Randomize
            </button>
         </div>
      </main>
   );
}

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
            cellColor = 0xff0000;
         }
         else
         {
             // Black for true, white for false
            cellColor = cell ? 'black' : 'white';
         }

         return <Rect
            fill={ cellColor }
            x={ x }
            y={ y }
            height={ CELL_HEIGHT - ( CELL_BORDER_WIDTH * 2 ) }
            width={ CELL_WIDTH - ( CELL_BORDER_WIDTH * 2 ) }
            onMouseDown={ ( ) => { handleCellClick( rowIndex, colIndex, props.gameBoard, props.setGameBoard ) } }
         />
      });
   });
}

function handleCellClick( rowIndex, colIndex, gameBoard, setGameBoard )
{
   var updatedGameBoard = [ ...gameBoard ];
   updatedGameBoard[ rowIndex ][ colIndex ] = !updatedGameBoard[ rowIndex ][ colIndex ];
   setGameBoard( updatedGameBoard );
};

export default Conway;