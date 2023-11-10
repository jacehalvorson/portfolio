import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';
import { GameBoard, CELL_HEIGHT, CELL_WIDTH } from './game_board';

const NUM_ROWS = 20;
const NUM_COLS = 40;
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
   
   const resetBoard = useCallback( ( ) =>
   {
      setGameBoard( getBlankBoard( false ) );
      console.log( `isPaused = ${isPaused}` );
   }, [ setGameBoard, isPaused ] );

   const randomizeBoard = useCallback( ( ) =>
   {
      setGameBoard( getRandomBoard( ) );
   }, [ setGameBoard ] );

   const buttons = [ [ 'Reset', resetBoard ],
                     [ 'Play', togglePause ],
                     [ 'Randomize', randomizeBoard ], ];
   
   // Initialize the game board
   useEffect( ( ) =>
   {
      resetBoard( );
   }, [ resetBoard ] );

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

export default Conway;