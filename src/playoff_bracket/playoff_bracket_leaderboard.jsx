import React from "react";
import { API } from "aws-amplify";

import { FootballYearStarts } from "./YearUpdate.js";
import { logoFilename, pretendPick } from "./script.js";
import calculatePoints from "./playoff_bracket_calculate_points.js";

import "./playoff_bracket_leaderboard.css";
import "../index.css";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const apiName = "apiplayoffbrackets";
let testPicks = "0000000000000";

function PlayoffBracketLeaderboard(props)
{
   const [ scores, setScores ] = React.useState( [] );
   const [ scoresStatus, setScoresStatus ] = React.useState( "Loading brackets..." );

   const newBracketSubmitted = props.newBracketSubmitted;
   
   React.useEffect( ( ) => {
      // Instead of fetching for the current year, fetch for 2025 temporarily.
      //   API.get( apiName, "/?table=playoffBrackets" + CurrentYear() )
      API.get( apiName, "/?table=playoffBrackets2025" )
         .then(response => {
            // Extract the winning bracket from the response
            const winningEntry = response.find(entry => entry.name === "NFL_BRACKET");
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
      {
         ( scoresStatus !== "" )
            ? <h2>{ scoresStatus }</h2>
            : scores.map( ( entry, index ) => {
            return (
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

                  {/* Teams playing this week that this entry picked*/}
                  <ToggleButtonGroup className="playoff-bracket-leaderboard-game">
                  {
                     // TODO add gamePlaying to brackets
                     // entry.gamePlaying
                     []
                        .sort((a, b) => a.numberOrder > b.numberOrder ? 1 : -1)
                        .map((team, index) => {
                           return (
                              <ToggleButton
                                 className="playoff-bracket-leaderboard-team"
                              >
                                 <div className="image-container">
                                    <Popup trigger=
                                          {
                                             <img src={logoFilename(team.game)}
                                                alt={team.game}
                                                key={index}
                                             />
                                          }
                                          nested >
                                          {
                                             close =>
                                             (
                                                <div className="playoff-bracket-leaderboard-team"> {team.game}
                                                      <div>
                                                         <button onClick={() => { let list = pretendPick(team.weekDivision, team.conferance, team.smallList, team.winNumber, testPicks); testPicks = list;  close(); }}>
                                                            Won!
                                                         </button>
                                                         <button onClick={() => { let list = pretendPick(team.weekDivision, team.conferance, team.smallList, team.loseNumber, testPicks); testPicks = list;  close(); }}>
                                                            Lost!
                                                         </button>
                                                         <button onClick={() => close()}>
                                                            Cancel
                                                         </button>
                                                         <button onClick={() => { testPicks = "0000000000000"; console.log("Reseting all."); close(); }}>
                                                            Restart All
                                                         </button>
                                                      </div>
                                                </div>
                                             )
                                       }
                                    </Popup>
                                 </div>
                              </ToggleButton>
                           );
                        })
                  }
                  </ToggleButtonGroup>
                  {
                     <img src={"images/teams/Vikings-logo.png"}
                           alt="Super Bowl winner"
                           className="games-playing team-logo"
                     />
                  }
               </div>
            );
         })
      }
      </div>
   );
}

export default PlayoffBracketLeaderboard;
