import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import {getBrackets, CurrentYear, getTeamName, logoFilename} from "./script.js";
//import logoFilenameDict from "./playoff_bracket_constants.js";
import "./playoff_bracket.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function getOrCreateDeviceId() 
{
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
      deviceId = Math.random().toString(36).substr(2, 9); // Generate a random string
      localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

function PlayoffBracket( )
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

			// Get the device ID which is comman for a single person.
			const deviceId = getOrCreateDeviceId();
console.log("Device: " + deviceId);	
// 3jqsmufo9

			// Use the deviceId to look up the pick that the may have changed.
			// response2.split ... to receive the data from API.

            // Get the points, max points, and bracket for each player
            let brackets = getBrackets( response, winningEntry.picks/*, response2*/ );
//let brackets = getBrackets( response, "0000000000000",
//									  "0100000000000" );


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

            // Set scores variable to display list of players
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
      <main id="playoff-bracket">
         <a href={"/playoffbracket/entry?deviceID=" + getOrCreateDeviceId() } 
		 >
            <div id="back-button">
               {/* Left arrow icon */}
               <svg
                  id="home-arrow-right"
                  className="home-arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  >
                  <path d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"/>
               </svg>
               <h2>Picks</h2>

            </div>
         </a>

         <h1>{ CurrentYear() } Playoff Bracket Leaderboard</h1>
         
         <div className="leaderboard">
         {
            ( scoresStatus !== "" )
               ? <h2>{ scoresStatus }</h2>
               : scores.map( ( player, index ) => {
               return (
                  <a href={"https://next.playoffpredictors.com/football/nfl/playoffpicture/37033920-C0E1-4EF4-8F0D-DA53DA41E3A0?L=" + player.picks + "&sbhomescore=0&sbawayscore=0"}
                     target="_blank"
                     key={index}
                  >
                     <div className="player">
                        {/* Player name */}
                        <h2 className="name">{ player.name }</h2>

                        {/* Score */}
                        <h2 className="score" style={{marginTop: 3}}>{ player.pointsWon }</h2>

                        {/* Possible score */}
                        <h3 className="possible-score">{ player.pointsAvailable } possible</h3>

                        {/* Teams playing this week that this player picked*/}
                        { 
                           player.gamePlaying.map( ( team, index ) => {
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
                           ( player.gamePlaying.length === 0 )
                              ? <>
                                    <img src={ logoFilename(getTeamName(CurrentYear(), player.superBowl[ 0 ].conference, player.superBowl[ 0 ].prediction )) }
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
         <div id="playoff-bracket-background-picture" />
      </main>
   );
}

export default PlayoffBracket;
