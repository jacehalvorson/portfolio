import { Rect } from 'react-konva';

export const CELL_WIDTH = 50;
export const CELL_HEIGHT = 50;
const CELL_BORDER_WIDTH = 1;


export function GameBoard( props )
{
   const isGameBoardInvalid = props.gameBoard === null || props.gameBoard.length === 0;
   const isNumRowsInvalid = props.numRows === null || props.numRows <= 0;
   const isNumColsInvalid = props.numCols === null || props.numCols <= 0;
   const isOffsetXInvalid = props.offsetX === null || props.offsetX < 0;
   const isOffsetYInvalid = props.offsetY === null || props.offsetY < 0;

   if ( isGameBoardInvalid ||
        isNumRowsInvalid ||
        isNumColsInvalid ||
        isOffsetXInvalid ||
        isOffsetYInvalid
      )
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
}