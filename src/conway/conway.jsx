import React, { useCallback, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import './conway.css'
import { getNextIteration } from './next_iteration';
import { GameBoard, CELL_HEIGHT, CELL_WIDTH } from './game_board';

const MILLISECONDS_PER_SECOND = 1000;

const NUM_ROWS = 40;
const NUM_COLS = 40;
const GAME_BOARD_WIDTH = NUM_COLS * CELL_WIDTH;
const GAME_BOARD_HEIGHT = NUM_ROWS * CELL_HEIGHT;
const PLAY_BUTTON_INDEX = 1;

const GAME_ITERATIONS_PER_SECOND = 10;

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
   const [ isMousedown, setIsMouseDown ] = useState( false );
   const [ previouslyFlippedCell, setPreviouslyFlippedCell ] = useState( { colIndex: -1, rowIndex: -1 } );

   const togglePause = useCallback( ( ) =>
   {
      setIsPaused( previousValue => 
      {
         // If switching to 'play,' force one iteration
         if ( previousValue )
         {  
            setGameBoard( previousGameBoard => getNextIteration( previousGameBoard ) );
         }

         // Toggle the pause state
         return !previousValue
      });
   }, [ setGameBoard, setIsPaused ] );
   
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
   

   const handleKeyPress = useCallback( ( event ) =>
   {
      const stepSize = ( event.ctrlKey ) ? 100 : 20;
      const maxOffsetX = GAME_BOARD_WIDTH - window.innerWidth;
      const maxOffsetY = GAME_BOARD_HEIGHT - window.innerHeight;

      switch ( event.keyCode )
      {
      // Right Arrow
      case 39:
         console.log( 'right arrow' );
         setOffsetX( previousValue => 
         {
            let nextValue = previousValue + stepSize;
            if ( nextValue > maxOffsetX )
            {
               nextValue = maxOffsetX;
            }
            return nextValue;
         });

         break;
      
      // Left Arrow
      case 37:
         console.log( 'left arrow' );
         setOffsetX( previousValue =>
         {
            let nextValue = previousValue - stepSize;
            if ( nextValue < 0 )
            {
               nextValue = 0;
            }
            return nextValue;
         });

         break;
      
      // Up Arrow
      case 38:
         console.log( 'up arrow' );
         setOffsetY( previousValue =>
         {
            let nextValue = previousValue - stepSize;
            if ( nextValue < 0 )
            {
               nextValue = 0;
            }
            return nextValue;
         });

         break;

      // Down Arrow
      case 40:
         console.log( 'down arrow' );
         setOffsetY( previousValue =>
         {
            let nextValue = previousValue + stepSize;
            if ( nextValue > maxOffsetY )
            {
               nextValue = maxOffsetY;
            }
            return nextValue;
         });
         
         break;

      // Spacebar
      case 32:
         console.log( 'spacebar' );
         togglePause( );
         break;
      
      default:
         // do nothing
      }
   }, [ setOffsetX, setOffsetY, togglePause ] );


   // Initialize the game board
   useEffect( ( ) =>
   {
      resetBoard( );
   }, [ resetBoard ] );

   // NOT CURRENTLY USED, save for later
   // Frequency loop of TICKS_PER_SECOND
   // useEffect( ( ) =>
   // {
      // let interval = setInterval( ( ) =>
      // {
      // }, MILLISECONDS_PER_SECOND / TICKS_PER_SECOND );

      // return ( ) =>
      // {
      //    clearInterval( interval );
      // }
   // }, [ ] );


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
         <div tabIndex={ 1 } onKeyDown={ handleKeyPress } autofocus>
            <Stage
               width={ NUM_COLS * CELL_WIDTH }
               height={ NUM_ROWS * CELL_HEIGHT }
               id="game-stage"
            >
               <Layer
                  onMouseDown={ ( ) => { setIsMouseDown( true ); }}
                  onMouseUp={ ( ) => { setIsMouseDown( false ); }}
                  onMouseMove={ ( event ) =>
                  {
                     if ( isMousedown )
                     {
                        let boardX = event.evt.x + offsetX;
                        let boardY = event.evt.y + offsetY;
                        let colIndex = Math.floor( boardX / CELL_WIDTH );
                        let rowIndex = Math.floor( boardY / CELL_HEIGHT );

                        console.log( `col: ${colIndex}, row: ${rowIndex}` );

                        if ( previouslyFlippedCell.rowIndex !== rowIndex ||
                             previouslyFlippedCell.colIndex !== colIndex
                           )
                        {
                           console.log( 'flipping cell' );
                           handleCellClick( rowIndex, colIndex, setGameBoard, event.evt.ctrlKey );
                           
                           setPreviouslyFlippedCell( { colIndex: colIndex, rowIndex: rowIndex } );
                        }
                     }
                  }}
               >
                  <GameBoard
                     gameBoard={ gameBoard }
                     setGameBoard={ setGameBoard }
                     isPaused={ isPaused }
                     offsetX={ offsetX }
                     offsetY={ offsetY }
                  />
               </Layer>
            </Stage>
         </div>

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

function handleCellClick( rowIndex, colIndex, setGameBoard, isCtrlPressed )
{
   setGameBoard( previousGameBoard =>
   {
      previousGameBoard[ rowIndex ][ colIndex ] = isCtrlPressed ? false : true;
      return previousGameBoard;
   });
}

export default Conway;