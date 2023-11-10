import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';
import { GameBoard, CELL_HEIGHT, CELL_WIDTH } from './game_board';

const MILLISECONDS_PER_SECOND = 1000;

const NUM_ROWS = 40;
const NUM_COLS = 40;
const PLAY_BUTTON_INDEX = 1;

const TICKS_PER_SECOND = 1;
const GAME_ITERATIONS_PER_SECOND = 2;

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

   // Frequency loop of TICKS_PER_SECOND
   useEffect( ( ) =>
   {
      let interval = setInterval( ( ) =>
      {
            // TEMPORARY - Move the board around
            setOffsetX( previousValue => previousValue + ( Math.floor( Math.random() * 50 ) - 25 ) );
            setOffsetY( previousValue => previousValue + ( Math.floor( Math.random() * 50 ) - 25 ) );

            // Every once in a while, reset offsets
            if ( Math.random() > 0.95 )
            {
               setOffsetX( 200 );
               setOffsetY( 200 );
            }

            console.log( `offsetX: ${offsetX}, offsetY: ${offsetY}` );
      }, MILLISECONDS_PER_SECOND / TICKS_PER_SECOND );

      return ( ) =>
      {
         clearInterval( interval );
      }
   }, [ isPaused, setOffsetX, setOffsetY, offsetX, offsetY ] );


   // Frequency loop of GAME_ITERATIONS_PER_SECOND
   useEffect( ( ) =>
   {
      let interval = setInterval( ( ) =>
      {
         if ( !isPaused )
         {
            setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
         }
      }, MILLISECONDS_PER_SECOND / GAME_ITERATIONS_PER_SECOND );

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