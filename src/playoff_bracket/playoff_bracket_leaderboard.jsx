import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import {getBrackets, CurrentYear, getTeamName, logoFilename} from "./script.js";
import "./playoff_bracket_leaderboard.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketLeaderboard( )
{
   const [ scores, setScores ] = useState( [] );
   const [ scoresStatus, setScoresStatus ] = useState( "Loading brackets..." );
   
   useEffect( ( ) => {
      API.get( apiName, "/" )
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
            console.log(sortedBrackets[0]);
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

                     {/* Link icon */}
                     {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                        <path fill="white" d="M6.879 9.934c-0.208 0-0.416-0.079-0.575-0.238-1.486-1.486-1.486-3.905 0-5.392l3-3c0.72-0.72 1.678-1.117 2.696-1.117s1.976 0.397 2.696 1.117c1.486 1.487 1.486 3.905 0 5.392l-1.371 1.371c-0.317 0.317-0.832 0.317-1.149 0s-0.317-0.832 0-1.149l1.371-1.371c0.853-0.853 0.853-2.241 0-3.094-0.413-0.413-0.963-0.641-1.547-0.641s-1.134 0.228-1.547 0.641l-3 3c-0.853 0.853-0.853 2.241 0 3.094 0.317 0.317 0.317 0.832 0 1.149-0.159 0.159-0.367 0.238-0.575 0.238z"></path>
                        <path fill="white" d="M4 15.813c-1.018 0-1.976-0.397-2.696-1.117-1.486-1.486-1.486-3.905 0-5.392l1.371-1.371c0.317-0.317 0.832-0.317 1.149 0s0.317 0.832 0 1.149l-1.371 1.371c-0.853 0.853-0.853 2.241 0 3.094 0.413 0.413 0.962 0.641 1.547 0.641s1.134-0.228 1.547-0.641l3-3c0.853-0.853 0.853-2.241 0-3.094-0.317-0.317-0.317-0.832 0-1.149s0.832-0.317 1.149 0c1.486 1.486 1.486 3.905 0 5.392l-3 3c-0.72 0.72-1.678 1.117-2.696 1.117z"></path>
                     </svg> */}
                  </div>
               </a>
            );
         })
      }
      </div>
   );
}

export default PlayoffBracketLeaderboard;
