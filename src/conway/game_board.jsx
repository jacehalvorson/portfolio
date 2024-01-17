import { Rect } from 'react-konva';

export const CELL_WIDTH = 50;
export const CELL_HEIGHT = 50;
const CELL_BORDER_WIDTH = 1;


export function GameBoard( props )
{
   const isGameBoardInvalid = props.gameBoard === null || props.gameBoard.length === 0;
   const isSetGameBoardInvalid = props.setGameBoard === null;
   const isIsPausedInvalid = props.isPaused === null;
   const isOffsetXInvalid = props.offsetX === null || props.offsetX < 0;
   const isOffsetYInvalid = props.offsetY === null || props.offsetY < 0;
   
   // Don't render if any of the required props are invalid
   if ( isGameBoardInvalid ||
        isSetGameBoardInvalid ||
        isIsPausedInvalid ||
        isOffsetXInvalid ||
        isOffsetYInvalid
      )
   {
      return <></>;
   }

   const gameBoardWidth = props.gameBoard[0].length * CELL_WIDTH;
   const gameBoardHeight = props.gameBoard.length * CELL_HEIGHT;
   const maxOffsetX = gameBoardWidth - window.innerWidth;
   const maxOffsetY = gameBoardHeight - window.innerHeight;
   
   // Don't render if the offset is out of range
   if ( props.offsetX > maxOffsetX ||
        props.offsetY > maxOffsetY )
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

         if ( props.gameBoard[ rowIndex ][ colIndex ] === undefined )
         {
            // On error, show red cell
            cellColor = 0xff0000;
         }
         else
         {
             // White for true, black for false
            cellColor = cell ? 'white' : 'black';
         }

         return <Rect
            fill={ cellColor }
            x={ x - props.offsetX }
            y={ y - props.offsetY }
            height={ CELL_HEIGHT - ( CELL_BORDER_WIDTH * 2 ) }
            width={ CELL_WIDTH - ( CELL_BORDER_WIDTH * 2 ) }
         />
      });
   });
}