import { Rect } from 'react-konva';

export const CELL_WIDTH = 50;
export const CELL_HEIGHT = 50;
const CELL_BORDER_WIDTH = 1;


export function GameBoard( props )
{
   const isGameBoardInvalid = props.gameBoard === null || props.gameBoard.length === 0;
   const isSetGameBoardInvalid = props.setGameBoard === null;
   const isIsPausedInvalid = props.isPaused === null;
   const isOffsetXInvalid = props.offsetX === null;
   const isOffsetYInvalid = props.offsetY === null;
   
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
   const minOffsetX = 0;
   const minOffsetY = 0;
   
   const offsetX = ( props.offsetX > maxOffsetX )
      ? maxOffsetX
      : ( props.offsetX < minOffsetX )
         ? minOffsetX
         : props.offsetX;
   const offsetY = ( props.offsetY > maxOffsetY )
      ? maxOffsetY
      : ( props.offsetY < minOffsetY )
         ? minOffsetY
         : props.offsetY;

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
            x={ x - offsetX }
            y={ y - offsetY }
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
}