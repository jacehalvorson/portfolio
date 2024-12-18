import { useEffect, useState } from "react";
import { API } from "aws-amplify";

import { FootballYearStarts } from "./YearUpdate.js";
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
   const [ scores, setScores ] = useState( [] );
   const [ scoresStatus, setScoresStatus ] = useState( "Loading brackets..." );
   const [ currentGames, setCurrentGames ] = useState( [ ] );
   const [ testPicks, setTestPicks ] = useState( "000000" );

   const newBracketSubmitted = props.newBracketSubmitted;
   
   useEffect( ( ) => {
      // Instead of fetching for the current year, fetch for 2025 temporarily.
      //   API.get( apiName, "/?table=playoffBrackets" + CurrentYear() )
      API.get( apiName, "/?table=playoffBrackets2025" )
         .then(response => {
            // Extract the winning bracket from the response
            const winningEntry = response.find(entry => entry.name === "NFL_BRACKET");
            setCurrentGames( getCurrentGames( winningEntry.picks ) );
            // Take out the winning entry from the response
            response.splice(response.indexOf(winningEntry), 1);

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
                           tiebreaker: bracket.tiebreaket
                        })
                     );
                  }

                  if (player.devices && player.devices.includes(props.deviceId)) {
                     console.log("This is player " + player.name + " with device ID " + props.deviceId);
                  }
               }
            });

            // Get the points, max points, and bracket for each entry
            brackets.forEach( ( bracket ) =>
            {
               bracket.points = calculatePoints( bracket.picks, winningEntry.picks );
            });

            // Sort first on points won, then points available, then by name, then by bracket index
            let sortedBrackets = brackets.sort((a, b) => {
               if (b.points !== a.points) {
                  return b.points - a.points;
               }
               // else if (b.pointsAvailable !== a.pointsAvailable) {
               //    return b.pointsAvailable - a.pointsAvailable;
               // }
               else if (b.name !== a.name) {
                  return a.name.localeCompare(b.name);
               }
               else {
                  return a.bracketIndex - b.bracketIndex;
               }
            });

            // Set scores variable to display list of entries
            setScores(sortedBrackets);
            setScoresStatus("");
          })
         .catch( err => {
            console.error( err );
            setScoresStatus( "Error fetching brackets from database" );
         });
   }, [ props.deviceId, newBracketSubmitted ] );

   return (
      <div className="playoff-bracket-leaderboard">
         <div className="playoff-bracket-what-if">
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

                     return <ToggleButton className="playoff-bracket-what-if-button" value={teamIndex + 1} style={style}>
                        <img src={"/images/teams/" + teamName + "-logo.png"} alt={ teamName + " Logo" } />
                     </ToggleButton>
                  })}
               </ToggleButtonGroup>
            })
         }
         </div>

         {( scoresStatus )
         ? <h2>{ scoresStatus }</h2>
         : scores.map( ( entry, index ) =>
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
