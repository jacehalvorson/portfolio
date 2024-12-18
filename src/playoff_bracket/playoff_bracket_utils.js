const emptyGame = { homeTeam: null, awayTeam: null, winner: 0 };

const nflTeamColors = {
   "Ravens": "#241773",
   "Bengals": "#FB4F14",
   "Browns": "#311D00",
   "Steelers": "#FFB612",
   "Bills": "#00338D",
   "Dolphins": "#008E97",
   "Patriots": "#002244",
   "Jets": "#125740",
   "Texans": "#03202F",
   "Colts": "#002C5F",
   "Jaguars": "#101820",
   "Titans": "#0C2340",
   "Broncos": "#FB4F14",
   "Chiefs": "#E31837",
   "Raiders": "#000000",
   "Chargers": "#0080C6",
   "Bears": "#0B162A",
   "Lions": "#0076B6",
   "Packers": "#203731",
   "Vikings": "#4F2683",
   "Cowboys": "#003594",
   "Giants": "#0B2265",
   "Eagles": "#004C54",
   "Commanders": "#5A1414",
   "Falcons": "#A71930",
   "Panthers": "#0085CA",
   "Saints": "#D3BC8D",
   "Buccaneers": "#D50A0A",
   "Cardinals": "#97233F",
   "Rams": "#003594",
   "49ers": "#AA0000",
   "Seahawks": "#002244",
};

// Given the wildcard games and the picks, compute the divisional games.
// conference is either "N" or "A" for NFC or AFC.
// wildcardPicks is a string with 3 characters. e.g., "011" means the first game is
// unpicked and the second and third games are picked for the home team, where the
// first game is defined as the highest seed playing the lowest seed.
function computeWildcardGames( conference, wildcardPicks )
{
   return [
   {
      homeTeam: conference.toString() + "2",
      awayTeam: conference.toString() + "7",
      winner: Number(wildcardPicks[0])
   },
   {
      homeTeam: conference.toString() + "3",
      awayTeam: conference.toString() + "6",
      winner: Number(wildcardPicks[1])
   },
   {
      homeTeam: conference.toString() + "4",
      awayTeam: conference.toString() + "5",
      winner: Number(wildcardPicks[2])
   }];
}

// Given the wildcard games, the bye team, and the picks, compute the divisional games.
// divisionalPicks is a string with 2 charactes. e.g., "01" means the first game is
// unpicked and the second game is picked for the home team, where the first game
// is defined as the highest seed playing the lowest seed.
function computeDivisionalGames( wildcardGames, conference, divisionalPicks )
{
   let divisionalTeams = [ conference.toString() + "1" ];
   let divisionalGames = [ ];

   wildcardGames.forEach( game =>
   {
      if ( game.winner === 1 && game.homeTeam )
      {
         divisionalTeams.push( game.homeTeam );
      }
      else if ( game.winner === 2 && game.awayTeam )
      {
         divisionalTeams.push( game.awayTeam );
      }
      // For games with no team picked (0), do nothing
   });

   // Sort teams by seed
   divisionalTeams.sort( ( a, b ) => a.seed - b.seed );

   // Repeatedly take the highest and lowest seeds to play each other
   // until there are no more teams left
   while ( divisionalTeams.length > 0 )
   {
      divisionalGames.push({
         // Home team is the highest seed
         homeTeam: divisionalTeams[0],
         // Away team is the lowest seed or use null if there is no other team
         awayTeam: ( divisionalTeams.length > 1 )
            ? divisionalTeams.at( -1 )
            : null,
         // Leave win prediction blank
         winner: 0
      });

      // Take off the teams just used
      if ( divisionalTeams.length > 1 )
         divisionalTeams = divisionalTeams.slice( 1, ( divisionalTeams.length - 1 ) );
      else
         divisionalTeams = [ ];
   }

   // If there is only one game, add an empty one
   if ( divisionalGames.length === 1 )
   {
      divisionalGames.push( emptyGame );
   }

   // Incorporate picks into the divisional games
   divisionalGames[0].winner = Number( divisionalPicks[0] );
   divisionalGames[1].winner = Number( divisionalPicks[1] );

   return divisionalGames;
}

// Given the divisional games and the championship pick, compute the championship game
// championshipPick is a string with 1 character. e.g., "1" means the home team won.
function computeChampionshipGame( divisionalGames, championshipPick )
{
   let championshipTeams = [ ];

   divisionalGames.forEach( game =>
   {
      if ( game.winner === 1 && game.homeTeam )
      {
         championshipTeams.push( game.homeTeam );
      }
      else if ( game.winner === 2 && game.awayTeam )
      {
         championshipTeams.push( game.awayTeam );
      }
      // For games with no team picked (0), do nothing
   });

   if ( championshipTeams.length === 0 )
   {
      return emptyGame;
   }

   // Sort teams by seed
   championshipTeams.sort( ( a, b ) => a.seed - b.seed );

   return {
      homeTeam: championshipTeams[0],
      awayTeam: ( championshipTeams.length > 1 )
         ? championshipTeams[1]
         : null,
      winner: Number( championshipPick )
   };
}

// Given the championship games and the super bowl pick, compute the super bowl game
// superBowlPick is a string with 1 character. e.g., "1" means the AFC team won.
function computeSuperBowl( afcChampionship, nfcChampionship, superBowlPick )
{
   return {
      homeTeam: ( afcChampionship.winner === 1 && afcChampionship.homeTeam )
         ? afcChampionship.homeTeam
         : ( afcChampionship.winner === 2 && afcChampionship.awayTeam )
            ? afcChampionship.awayTeam
            : null,
      awayTeam: ( nfcChampionship.winner === 1 && nfcChampionship.homeTeam )
         ? nfcChampionship.homeTeam
         : ( nfcChampionship.winner === 2 && nfcChampionship.awayTeam )
            ? nfcChampionship.awayTeam
            : null,
      winner: Number( superBowlPick )
   };
}

// nflGameResults takes the "1011021210000" format.
function getCurrentGames( nflGameResults )
{
   let afcWildcardGames = computeWildcardGames( "A", nflGameResults.substring( 0, 3 ) );
   let nfcWildcardGames = computeWildcardGames( "N", nflGameResults.substring( 3, 6 ) );
   let afcDivisionalGames = computeDivisionalGames( afcWildcardGames, "A", nflGameResults.substring( 6, 8 ) );
   let nfcDivisionalGames = computeDivisionalGames( nfcWildcardGames, "N", nflGameResults.substring( 8, 10 ) );
   let afcChampionshipGame = computeChampionshipGame( afcDivisionalGames, nflGameResults.substring( 10, 11 ) );
   let nfcChampionshipGame = computeChampionshipGame( nfcDivisionalGames, nflGameResults.substring( 11, 12 ) );
   let superBowl = computeSuperBowl( afcChampionshipGame, nfcChampionshipGame, nflGameResults.substring( 12, 13 ) );

   if ( nflGameResults.substring( 0, 6 ).includes( "0" ) )
   {
      // Wild Card games
      return [ ...afcWildcardGames, ...nfcWildcardGames ];
   }
   else if ( nflGameResults.substring( 6, 12 ).includes( "0" ) )
   {
      // Divisional games
      return [ ...afcDivisionalGames, ...nfcDivisionalGames ];
   }
   else if ( nflGameResults.substring( 12, 13 ) === "0" )
   {
      // Championship games
      return [ afcChampionshipGame, nfcChampionshipGame ];
   }
   else
   {
      // Super Bowl
      return [ superBowl ];
   }
}


export { computeWildcardGames, computeDivisionalGames, computeChampionshipGame, computeSuperBowl, getCurrentGames, emptyGame, nflTeamColors };
