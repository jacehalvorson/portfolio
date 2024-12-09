import { API } from "aws-amplify";

const apiName = "apiplayoffbrackets";
const emptyGame = { homeTeam: null, awayTeam: null, winner: 0 };

// Given the wildcard games and the picks, compute the divisional games.
// conference is either "N" or "A" for NFC or AFC.
// wildcardPicks is a string with 3 characters. e.g., "011" means the first game is
// unpicked and the second and third games are picked for the home team, where the
// first game is defined as the highest seed playing the lowest seed.
function computeWildcardGames( playoffTeams, conference, wildcardPicks )
{
   return [
   {
      homeTeam: playoffTeams[ conference + "2" ],
      awayTeam: playoffTeams[ conference + "7" ],
      winner: Number(wildcardPicks[0])
   },
   {
      homeTeam: playoffTeams[ conference + "3" ],
      awayTeam: playoffTeams[ conference + "6" ],
      winner: Number(wildcardPicks[1])
   },
   {
      homeTeam: playoffTeams[ conference + "4" ],
      awayTeam: playoffTeams[ conference + "5" ],
      winner: Number(wildcardPicks[2])
   }];
}

// Given the wildcard games, the bye team, and the picks, compute the divisional games.
// divisionalPicks is a string with 2 charactes. e.g., "01" means the first game is
// unpicked and the second game is picked for the home team, where the first game
// is defined as the highest seed playing the lowest seed.
function computeDivisionalGames( wildcardGames, byeTeam, divisionalPicks )
{
   let divisionalTeams = [ byeTeam ];
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


async function addBracketToTable( setPostStatus, deviceId )
{
   let name = document.getElementById( "name-input" ).value;
   let bracket = {
      picks: document.getElementById( "picks-input" ).value,
      tiebreaker: Number( document.getElementById( "tiebreaker-input" ).value )
   };

   // Sanitize input
   if ( !name || !bracket || !bracket.picks || !bracket.tiebreaker ||
        name === "" ||
        bracket.picks === "" || isNaN( Number( bracket.picks ) ) || bracket.picks.length !== 13 ||
        isNaN( bracket.tiebreaker ) || bracket.tiebreaker < 0 )
   {
      console.log( "Invalid input: name: " + name + ", picks: " + bracket.picks + ", tiebreaker: " + bracket.tiebreaker + " }" );
      setPostStatus( "Invalid input" );
      return;
   }

   setPostStatus( "Adding bracket to leaderboard..." );

   // Check if this player is already in the database
   API.get( apiName, "/?table=playoffBrackets2025" )
   .then( response => {
      let player = response.find( entry => entry.name === name );

      // Default case - new player, start a list of brackets and devices
      let brackets = [ bracket ];
      let devices = [ deviceId ];
      
      if ( player )
      {
         // If the player already has brackets but not this one, add this one to the list.
         // Throw error if this was an attempt to re-submit the same bracket.
         if ( player.brackets.length > 0 )
         {
            if ( player.brackets.find( entry => entry.picks === bracket.picks && entry.tiebreaker === bracket.tiebreaker ) )
            {
               throw Error("Bracket is already in database");
            }
            else
            {
               brackets = player.brackets.concat( brackets );
            }
         }
               
         // If the player already has devices but not this one, add this one to the list.
         // No error if device already exists.
         if ( player.devices.length > 0 && !player.includes( deviceId ) )
         {
            devices = player.devices.concat( devices );
         }
      }

      let bracketData = {
         name: name,
         brackets: brackets,
         devices: devices
      };
   
      // Send POST request to database API with this data
      API.post( apiName, "/?table=playoffBrackets2025", {
         headers: {
            "Content-Type": "application/json"
         },
         body: bracketData
      })
      .then( response => {
         setPostStatus( "Success" );
      })
      .catch( err => {
         console.error( err );
         setPostStatus( "Error adding bracket to database" );
      });
   })
   .catch( err => {
      console.error( err );
      setPostStatus( (err.message === "Bracket is already in database")
         ? err.message
         : "Error while fetching brackets from database"
      );
   });
}

export { addBracketToTable, computeWildcardGames, computeDivisionalGames, computeChampionshipGame, emptyGame };
