export function getNextIteration( board )
{
   var nextBoard = [ ...board ];
   
   for ( var i = 0; i < board.length; i++ )
   {
      for ( var j = 0; j < board[i].length; j++ )
      {
         var numNeighbors = getNumNeighbors( board, i, j );
         var isAlive = board[i][j];
         
         if ( isAlive )
         {
            switch ( numNeighbors )
            {
               // Live cells with 2 or 3 neighbors stay alive, all others die
               case 2:
               case 3:
                  nextBoard[i][j] = true;
                  break;
               default:
                  nextBoard[i][j] = false;
                  break;
            }
         }
         else
         {
            // Dead cells with 3 neighbors become alive, all others stay dead
            if ( numNeighbors === 3 )
            {
               nextBoard[i][j] = true;
            }
         }
      }
   }
   return nextBoard;
}

function getNumNeighbors( board, i, j )
{
   var numNeighbors = 0;
   for ( var x = i - 1; x <= i + 1; x++ )
   {
      for ( var y = j - 1; y <= j + 1; y++ )
      {
         if ( x >= 0 && x < board.length &&
              y >= 0 && y < board[i].length &&
              !( x === i && y === j ) )
         {
            if ( board[ x ][ y ] )
            {
               numNeighbors += 1;
            }
         }
      }
   }
   return numNeighbors;
}