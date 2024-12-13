import { computeWildcardGames, computeDivisionalGames, computeChampionshipGame, computeSuperBowl } from "./playoff_bracket_utils";

// Returns "N1", "N2", ..., "A1", "A2", ...
function getWinnerConferenceSeed( game )
{
   if ( game.winner === 1 )
   {
      return game.homeTeam;
   }
   else if ( game.winner === 2 )
   {
      return game.awayTeam ;
   }
   else
   {
      return null;
   }
}

// Both picks and nflGameResults take the "1011021210000" format.
// playoffTeams is an object with keys like "N1", "N2", ..., "A1", "A2", ...
export default function calculatePoints( picks, nflGameResults )
{
   let points = 0;

   // Make a list of Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
   let afcWildcardGames = {
      predicted: computeWildcardGames( "A", picks.substring( 0, 3 ) ),
      correct: computeWildcardGames( "A", nflGameResults.substring( 0, 3 ) )
   };
   let nfcWildcardGames = {
      predicted: computeWildcardGames( "N", picks.substring( 3, 6 ) ),
      correct: computeWildcardGames( "N", nflGameResults.substring( 3, 6 ) )
   };

   // Make a list of Divisional teams that play each other
   let afcDivisionalGames = {
      predicted: computeDivisionalGames( afcWildcardGames.predicted, "A", picks.substring( 6, 8 ) ),
      correct: computeDivisionalGames( afcWildcardGames.correct, "A", nflGameResults.substring( 6, 8 ) )
   }
   let nfcDivisionalGames = {
      predicted: computeDivisionalGames( nfcWildcardGames.predicted, "N", picks.substring( 8, 10 ) ),
      correct: computeDivisionalGames( nfcWildcardGames.correct, "N", nflGameResults.substring( 8, 10 ) )
   }

   // Make a list of Championship teams that play each other
   let afcChampionshipGame = {
      predicted: computeChampionshipGame( afcDivisionalGames.predicted, picks.substring( 10, 11 ) ),
      correct: computeChampionshipGame( afcDivisionalGames.correct, nflGameResults.substring( 10, 11 ) )
   }
   let nfcChampionshipGame = {
      predicted: computeChampionshipGame( nfcDivisionalGames.predicted, picks.substring( 11, 12 ) ),
      correct: computeChampionshipGame( nfcDivisionalGames.correct, nflGameResults.substring( 11, 12 ) )
   }

   // Make a list of Super Bowl teams that play each other
   let superBowl = {
      predicted: computeSuperBowl( afcChampionshipGame.predicted, nfcChampionshipGame.predicted, picks.substring( 12, 13 ) ),
      correct: computeSuperBowl( afcChampionshipGame.correct, nfcChampionshipGame.correct, nflGameResults.substring( 12, 13 ) )
   };

   // Tally up correct wild card picks (1 point each)
   afcWildcardGames.predicted.forEach( ( predictedGame, index ) =>
   {
      let nflGame = afcWildcardGames.correct[ index ];
      if ( getWinnerConferenceSeed( predictedGame ) &&
           getWinnerConferenceSeed( predictedGame ) === getWinnerConferenceSeed( nflGame ) )
      {
         points += 1;
      }
   });
   nfcWildcardGames.predicted.forEach( ( predictedGame, index ) =>
   {
      let nflGame = nfcWildcardGames.correct[ index ];
      if ( getWinnerConferenceSeed( predictedGame ) &&
           getWinnerConferenceSeed( predictedGame ) === getWinnerConferenceSeed( nflGame ) )
      {
         points += 1;
      }
   });

   // Tally up correct divisional picks (2 point each)
   afcDivisionalGames.predicted.forEach( ( predictedGame, index ) =>
   {
      let nflGame = afcDivisionalGames.correct[ index ];
      if ( getWinnerConferenceSeed( predictedGame ) &&
           getWinnerConferenceSeed( predictedGame ) === getWinnerConferenceSeed( nflGame ) )
      {
         points += 2;
      }
   });
   nfcDivisionalGames.predicted.forEach( ( predictedGame, index ) =>
   {
      let nflGame = nfcDivisionalGames.correct[ index ];
      if ( getWinnerConferenceSeed( predictedGame ) &&
           getWinnerConferenceSeed( predictedGame ) === getWinnerConferenceSeed( nflGame ) )
      {
         points += 2;
      }
   });

   // Tally up correct championship picks (4 point each)
   if ( getWinnerConferenceSeed( afcChampionshipGame.predicted ) &&
        getWinnerConferenceSeed( afcChampionshipGame.predicted ) === getWinnerConferenceSeed( afcChampionshipGame.correct ) )
   {
      points += 4;
   }
   if ( getWinnerConferenceSeed( nfcChampionshipGame.predicted ) &&
        getWinnerConferenceSeed( nfcChampionshipGame.predicted ) === getWinnerConferenceSeed( nfcChampionshipGame.correct ) )
   {
      points += 4;
   }

   // Tally up correct super bowl pick (8 points)
   if ( getWinnerConferenceSeed( superBowl.predicted ) &&
        getWinnerConferenceSeed( superBowl.predicted ) === getWinnerConferenceSeed( superBowl.correct ) )
   {
      points += 8;
   }

   return points;
}
