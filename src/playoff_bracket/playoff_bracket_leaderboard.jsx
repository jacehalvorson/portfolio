import { useEffect, useState } from "react";
import { API } from "aws-amplify";

import { CurrentYear, FootballYearStarts } from "./YearUpdate.js";
import calculatePoints from "./playoff_bracket_calculate_points.js";
import { getCurrentGames, nflTeamColors } from "./playoff_bracket_utils.js";
import { playoffTeams2025 } from "./playoff_bracket_picks.jsx";

import "./playoff_bracket_leaderboard.css";
import "../index.css";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const apiName = "apiplayoffbrackets";

function PlayoffBracketLeaderboard(props)
{
   const [ brackets, setBrackets ] = useState( [ ] );
   const [ loadStatus, setLoadStatus ] = useState( "Loading brackets..." );
   const [ winningEntry, setWinningEntry ] = useState( { name: "NFL_BRACKET", picks: "0000000000000" } );
   const [ currentGames, setCurrentGames ] = useState( [ ] );
   const [ testPicks, setTestPicks ] = useState( "000000" );

   const newBracketSubmitted = props.newBracketSubmitted;
   
   useEffect( ( ) => {
      API.get( apiName, "/?table=playoffBrackets" + CurrentYear() )
         .then(response => {
            // Extract the winning bracket from the response
            const winningEntry = response.find( entry => entry.name === "NFL_BRACKET" );
            // Take out the winning entry from the response
            response.splice(response.indexOf(winningEntry), 1);
            // Set global variable
            setWinningEntry( winningEntry );

            let brackets = [];
            response.forEach(player => {
               if (FootballYearStarts() === true || (player.devices && player.devices.includes(props.deviceId))) {
                  if (!player.brackets || player.brackets.length === 0) {
                     console.error("Player " + player.name + " has no brackets");
                  }
                  else {
                     player.brackets.forEach((bracket, bracketIndex) =>
                        brackets.push({
                           name: player.name,
                           bracketIndex: bracketIndex,
                           picks: bracket.picks,
                           tiebreaker: bracket.tiebreaker,
                           score: 0,
                           maxPoints: 0
                        })
                     );
                  }

                  if (player.devices && player.devices.includes(props.deviceId)) {
                     console.log("This is player " + player.name + " with device ID " + props.deviceId);
                  }
               }
            });
            setBrackets( brackets );
          })
         .catch( err => {
            console.error( err );
            setLoadStatus( "Error fetching brackets from database" );
         });
   }, [ props.deviceId, newBracketSubmitted ] );

   // Update the scores when the brackets, winning entry, or test picks change
   useEffect( ( ) => {
      // Use winning entry to calculate scores, but splice in test picks for the current unpicked games
      const currentGames = getCurrentGames( winningEntry.picks );
      let scoreSource;
      switch ( currentGames.length )
      {
         case 6:
            // Wildcard round, use the first 6 picks from the test picks
            scoreSource = testPicks + winningEntry.picks.substring( 6 );
            break;
         case 4:
            // Divisional round, use the first 6 picks from the winning entry, then 4 of the test picks, then the rest from the winning entry
            scoreSource = winningEntry.picks.substring( 0, 6 ) + testPicks.substring( 0, 4 ) + winningEntry.picks.substring( 11 );
            break;
         case 2:
            // Championships, use the first 10 picks from the winning entry, then 2 of the test picks, then the rest from the winning entry
            scoreSource = winningEntry.picks.substring( 0, 10 ) + testPicks.substring( 0, 2 ) + winningEntry.picks.substring( 13 );
            break;
         case 1:
            // Super Bowl, use the first 12 picks from the winning entry, then 1 of the test picks
            scoreSource = winningEntry.picks.substring( 0, 12 ) + testPicks.substring( 0, 1 );
            break;
         case 0: // Intentional fall-through
         default:
            // Use the winning entry directly
            scoreSource = winningEntry.picks;
            break;
      }

      console.log("Score source: " + scoreSource);

      // Calculate points, sort, and write the brackets to the global variable
      setBrackets( brackets =>
      {
         brackets.forEach(bracket => {
            bracket.points = calculatePoints( bracket.picks, scoreSource, currentGames );
            // bracket.maxPoints = calculateMaxPoints( bracket.picks, winningEntry.picks, currentGames );
         });
   
         // Sort first on points won, then points available, then by name, then by bracket index
         return brackets.sort((a, b) => {
            if (b.points !== a.points) {
               return b.points - a.points;
            }
            // else if (b.maxPoints !== a.maxPoints) {
            //    return b.maxPoints - a.maxPoints;
            // }
            else if (b.name !== a.name) {
               return a.name.localeCompare(b.name);
            }
            else {
               return a.bracketIndex - b.bracketIndex;
            }
         });
      });

      // Set current games and load status
      setCurrentGames( currentGames );
      setLoadStatus("");
   }, [ brackets, winningEntry, testPicks ] );

   return (
      <div id="playoff-bracket-leaderboard">
         <div id="playoff-bracket-what-if">
         {
            currentGames.map( ( game, gameIndex ) =>
            {
               const winner = Number(testPicks[gameIndex]);

               const changeHandler = ( event, newWinner ) =>
               {
                  let newPick = ( newWinner === null ) ? 0 : newWinner;
                  setTestPicks( oldTestPicks =>
                     oldTestPicks.substring( 0, gameIndex ) + newPick.toString() + oldTestPicks.substring( gameIndex + 1 )
                  );
               }

               return <ToggleButtonGroup
                  className="playoff-bracket-what-if-group"
                  key={gameIndex}
                  orientation="vertical"
                  exclusive
                  onChange={changeHandler}
                  value={winner}
               >
                  {[ game.homeTeam, game.awayTeam ].map( ( team, teamIndex ) =>
                  {
                     if ( !team )
                        return <></>;

                     const teamName = playoffTeams2025[team].name;
                     const style = {
                        backgroundColor: ( winner === ( teamIndex + 1 ) && nflTeamColors[ teamName ] )
                           ? nflTeamColors[ teamName ]
                           : ""
                     };

                     return <ToggleButton
                        className="playoff-bracket-what-if-button"
                        value={teamIndex + 1}
                        style={style}
                        key={teamIndex}
                     >
                        <img src={"/images/teams/" + teamName + "-logo.png"} alt={ teamName + " Logo" } />
                     </ToggleButton>
                  })}
               </ToggleButtonGroup>
            })
         }
         </div>

         {( loadStatus )
         ? <h2>{ loadStatus }</h2>
         : brackets.map( ( entry, index ) =>
            <div className="playoff-bracket-leaderboard-entry" 
               onClick={ ( ) => { props.setPicks( entry.picks ) } }
               key={index}
            >
               {/* Entry name */}
               <h2 className="name">{ entry.name }{ ( true ) ? ` (${entry.bracketIndex + 1})` : "" }</h2>
               {/* Score */}
               <h2 className="score" style={{marginTop: 3}}>{ entry.points }</h2>

               {/* Possible score TODO add maxPoints to brackets*/}
               <h3 className="possible-score"> TBD possible</h3>
               
               <img src={"images/teams/Vikings-logo.png"}
                  alt="Super Bowl winner"
                  className="team-logo"
               />
            </div>
         )}
      </div>
   );
}

export default PlayoffBracketLeaderboard;
