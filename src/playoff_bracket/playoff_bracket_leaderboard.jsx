import React from "react";
import { API } from "aws-amplify";
import {getBrackets, CurrentYear, getTeamName, logoFilename} from "./script.js";
import "./playoff_bracket_leaderboard.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketLeaderboard( )
{
   const [ scores, setScores ] = React.useState( [] );
   const [ scoresStatus, setScoresStatus ] = React.useState( "Loading brackets..." );
   
   React.useEffect( ( ) => {
      API.get( apiName, "/?table=playoffBrackets2025" )
         .then( response => {

            // Extract the winning bracket from the response
            const winningEntry = response.find(entry => entry.name === "NFL_BRACKET");
            // Take out the winning entry from the response
            response.splice(response.indexOf(winningEntry), 1);

            // Use the deviceId to look up the pick that the may have changed.
            // response2.split ... to receive the data from API.

            // Get the points, max points, and bracket for each entry
            let brackets = getBrackets( response, winningEntry.picks/*, response2*/ );
            //let brackets = getBrackets( response, "0000000000000",
            //                                      "0100000000000" );
            
            // Sort first on points won, then points available, then by name
            let sortedBrackets = brackets.sort( ( a, b ) => 
            {
               if ( b.pointsWon !== a.pointsWon )
               {
                  return b.pointsWon - a.pointsWon;
               }
               else if ( b.pointsAvailable !== a.pointsAvailable )
               {
                  return b.pointsAvailable - a.pointsAvailable;
               }
               else
               {
                  return a.name.localeCompare( b.name );
               }
            });

            // Set scores variable to display list of entries
            setScores( sortedBrackets );
            setScoresStatus( "" );
         })
         .catch( err => {
            console.error( err );
            setScoresStatus( "Error fetching brackets from API" );
         });
   }, [ ] );

   return (
      <div className="leaderboard">
      {
         ( scoresStatus !== "" )
            ? <h2>{ scoresStatus }</h2>
            : scores.map( ( entry, index ) => {
            return (
               <a href={"https://next.playoffpredictors.com/football/nfl/playoffpicture/37033920-C0E1-4EF4-8F0D-DA53DA41E3A0?L=" + entry.picks + "&sbhomescore=0&sbawayscore=0"}
                  key={index}
               >
                  <div className="entry">
                     {/* Entry name */}
                     <h2 className="name">{ entry.name }</h2>

                     {/* Score */}
                     <h2 className="score" style={{marginTop: 3}}>{ entry.pointsWon }</h2>

                     {/* Possible score */}
                     <h3 className="possible-score">{ entry.pointsAvailable } possible</h3>

                     {/* Teams playing this week that this entry picked*/}
                     { 
                        entry.gamePlaying.map( ( team, index ) => {
                           return (                             
                              <img src={ logoFilename(team) }
                                 alt={ team }
                                 key={ index }
                                 className="games-playing team-logo"
                              />
                           );
                        })
                     }
                     {
                        // X if the super bowl winner is out
                        ( entry.gamePlaying.length === 0 )
                           ? <>
                                 <img src={ logoFilename(getTeamName(CurrentYear(), entry.superBowl[ 0 ].conference, entry.superBowl[ 0 ].prediction )) }
                                    alt="Eliminated"
                                    className="games-playing team-logo"
                                 />
                                 <img src="images/x.png"
                                    alt="Eliminated"
                                    className="games-playing eliminated-logo"
                                 />
                              </>
                           : <></>
                     }
                  </div>
               </a>
            );
         })
      }
      </div>
   );
}

export default PlayoffBracketLeaderboard;
