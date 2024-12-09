import { API } from "aws-amplify";

const apiName = "apiplayoffbrackets";
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
   "Navy": "#0B162A",
   "Honolulu": "#0076B6",
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

async function addBracketToTable( setSubmitStatus, deviceId, picks, tiebreaker )
{
   let brackets = [ ];
   let devices = [ ];
   let playerFound = false;
   let name = "";
   let bracket = {
      picks: picks,
      tiebreaker: tiebreaker
   };

   setSubmitStatus( "Adding bracket to leaderboard..." );

   // Check if this player is already in the database
   API.get( apiName, "/?table=playoffBrackets2025" )
   .then( response => {
      // First check if this device has been used in the past
      response.forEach( player =>
      {
         if ( ( player.devices && player.devices.includes( deviceId ) )  )
         {
            playerFound = true;
            window.confirm(`${player.name} - You have ${player.brackets.length} bracket${ ( player.brackets.length === 1 ) ? "" : "s"} in the database.\nDo you want to add another?\n`);
            name = player.name;
            if ( player.brackets.find( entry => entry.picks === bracket.picks && entry.tiebreaker === bracket.tiebreaker ) )
            {
               throw Error("Bracket is already in database");
            }
            brackets = player.brackets.concat( bracket );
            devices = player.devices;
         }
      });

      // Prompt for a name and check if it is already in the database
      if (!playerFound)
      {
         name = prompt( `Device ID: ${deviceId}\nPicks: ${bracket.picks}\nTiebreaker: ${bracket.tiebreaker}\n\nName:` );
         brackets = [ bracket ];
         devices = [ deviceId ];

         // Check if this player is already in the database (on a different device)
         response.forEach( player =>
         {
            if ( player.name === name )
            {
               playerFound = true;
               window.confirm(`${player.name} - You have ${player.brackets.length} bracket${ ( player.brackets.length === 1 ) ? "" : "s"} in the database.\nDo you want to add another?\n`);
               if ( player.brackets.find( entry => entry.picks === bracket.picks && entry.tiebreaker === bracket.tiebreaker ) )
               {
                  throw Error("Bracket is already in database");
               }
               brackets = player.brackets.concat( bracket );
               devices = player.devices.concat( deviceId );
            }
         });
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
         setSubmitStatus( "Success" );
      })
      .catch( err => {
         console.error( err );
         setSubmitStatus( "Error adding bracket to database" );
      });
   })
   .catch( err => {
      console.error( err );
      setSubmitStatus( (err.message === "Bracket is already in database")
         ? err.message
         : "Error while fetching brackets from database"
      );
   });
}

export { addBracketToTable, computeWildcardGames, computeDivisionalGames, computeChampionshipGame, emptyGame };
