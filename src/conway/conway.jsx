import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';

const CELL_WIDTH = 50;
const CELL_HEIGHT = 50;
const NUM_ROWS = 20;
const NUM_COLS = 40;
const CELL_BORDER_WIDTH = 1;

const PLAY_BUTTON_INDEX = 1;

function getRandomBoard( )
{
   return Array.from({ length: NUM_ROWS }, ( ) =>
      Array.from({ length: NUM_COLS }, ( ) => ( Math.random() > 0.5 ) )
   );
}
function getBlankBoard( isBoardWhite )
{
   return Array.from({ length: NUM_ROWS }, ( ) =>
      Array.from({ length: NUM_COLS }, ( ) => ( isBoardWhite ) )
   );
}

function Conway( )
{
   const [ gameBoard, setGameBoard ] = useState( [] );
   const [ isPaused, setIsPaused ] = useState( true );
   const togglePause = useCallback( ( ) =>
   {
      console.log( 'Toggle pause' );
      // If switching to 'play,' force one iteration
      if ( isPaused )
      {
         console.log( 'Forcing one iteration' );
         setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
      }

      setIsPaused( previousValue => !previousValue );
   }, [ setGameBoard, setIsPaused, isPaused ] );

   const buttons = [ [ 'Reset', resetBoard ],
                     [ 'Play', togglePause ],
                     [ 'Randomize', randomizeBoard ], ];

   function resetBoard( )
   {
      setGameBoard( getBlankBoard( false ) );
      console.log( `isPaused = ${isPaused}` );
   }

   function randomizeBoard( )
   {
      setGameBoard( getRandomBoard( ) );
   }
   
   // Initialize the game board
   useEffect( ( ) =>
   {
      resetBoard( );
   }, [ ] );

   // start the game
   useEffect( ( ) =>
   {
      let interval = setInterval( ( ) =>
      {
         if ( !isPaused )
         {
            console.log( 'Next iteration' );
            setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
         }
         else console.log( 'Paused' );
      }, 1000);

      return ( ) =>
      {
         clearInterval( interval );
      }
   }, [ isPaused, setGameBoard ] );

   return (
      <main id="conway">
         <Stage
            width={ NUM_COLS * CELL_WIDTH }
            height={ NUM_ROWS * CELL_HEIGHT }
            id="game-stage"
         >
            <Layer>
               <GameBoard
                  gameBoard={ gameBoard }
                  setGameBoard={ setGameBoard }
                  isPaused={ isPaused }
               />
            </Layer>
         </Stage>

         <div id="button-group">
            {buttons.map( ( buttonInfo, buttonIndex ) =>
            {
               let buttonText = buttonInfo[ 0 ];
               let buttonCallback = buttonInfo[ 1 ];

               if ( buttonIndex === PLAY_BUTTON_INDEX )
               {
                  buttonText = isPaused ? 'Play' : 'Pause';
               } 

               return <button
                  className="fab"
                  onClick={ buttonCallback }
               >
                  {buttonText}
               </button>
})}
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
            cellColor = cell ? 'white' : 'black';
         }

         return <Rect
            fill={ cellColor }
            x={ x }
            y={ y }
            height={ CELL_HEIGHT - ( CELL_BORDER_WIDTH * 2 ) }
            width={ CELL_WIDTH - ( CELL_BORDER_WIDTH * 2 ) }
            onMouseDown={ ( ) =>
            {
               if ( props.isPaused )
               {
                  handleCellClick( rowIndex, colIndex, props.gameBoard, props.setGameBoard )
               }
            }}
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