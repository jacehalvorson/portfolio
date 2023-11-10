import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';
import { GameBoard, CELL_HEIGHT, CELL_WIDTH } from './game_board';

const NUM_ROWS = 40;
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
   const [ offsetX, setOffsetX ] = useState( 0 );
   const [ offsetY, setOffsetY ] = useState( 0 );

   const togglePause = useCallback( ( ) =>
   {
      // If switching to 'play,' force one iteration
      if ( isPaused )
      {
         setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
      }

      setIsPaused( previousValue => !previousValue );
   }, [ setGameBoard, setIsPaused, isPaused ] );
   
   const resetBoard = useCallback( ( ) =>
   {
      setGameBoard( getBlankBoard( false ) );
   }, [ setGameBoard ] );

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
            setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );

            // TEMPORARY - Move the board around
            setOffsetX( previousValue => previousValue + ( Math.floor( Math.random() * 50 ) - 25 ) );
            setOffsetY( previousValue => previousValue + ( Math.floor( Math.random() * 50 ) - 25 ) );
            console.log( `offsetX: ${offsetX}, offsetY: ${offsetY}` );
         }
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
                  offsetX={ offsetX }
                  offsetY={ offsetY }
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