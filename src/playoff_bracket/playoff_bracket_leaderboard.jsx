import React from "react";
import { API } from "aws-amplify";
import {getBrackets, CurrentYear, getTeamName, logoFilename} from "./script.js";
import "./playoff_bracket_leaderboard.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketLeaderboard( props )
{
   const [ scores, setScores ] = React.useState( [] );
   const [ scoresStatus, setScoresStatus ] = React.useState( "Loading brackets..." );
   
   React.useEffect( ( ) => {
      API.get( apiName, "/?table=playoffBrackets2025" )
         .then( response => {

            // Extract the winning bracket from the response
            const winningEntry = response.find( entry => entry.name === "NFL_BRACKET" );
            // Take out the winning entry from the response
            response.splice( response.indexOf(winningEntry), 1 );

            // Use the deviceId to look up the pick that the may have changed.
            // response2.split ... to receive the data from API.

            let allBrackets = [];
            response.forEach( player =>
            {
               if ( player.brackets === undefined || player.brackets.length === 0 )
               {
                  console.error( "Player " + player.name + " has no brackets" );
               }
               else if ( player.brackets.length === 1 )
               {
                  allBrackets.push({
                     name: player.name,
                     picks: player.brackets[0].picks,
                     tiebreaker: player.brackets[0].tiebreaker
                  });
               }
               else
               {
                  player.brackets.forEach( ( bracket, bracketIndex ) =>
                     allBrackets.push({
                        name: player.name + " (" + (bracketIndex+1) + ")",
                        picks: bracket.picks,
                        tiebreaker: bracket.tiebreaket
                     })
                  );
               }

               if ( player.devices.includes( props.deviceId ) )
               {
                  console.log("This is player " + player.name + " with device ID " + props.deviceId );
               }
            })

            // Get the points, max points, and bracket for each entry
            let brackets = getBrackets( allBrackets, winningEntry.picks/*, response2*/ );
            //let brackets = getBrackets( brackets, "0000000000000",
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
            props.setNewBracketSubmitted( false );
            console.log( "Bracket scores loaded" );
         })
         .catch( err => {
            console.error( err );
            setScoresStatus( "Error fetching brackets from database" );
         });
   }, [ props.deviceId, props.newBracketSubmitted ] );

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
                              <img src={ logoFilename( getTeamName( CurrentYear(), entry.superBowl[ 0 ].conference, entry.superBowl[ 0 ].prediction ) ) }
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
            );
         })
      }
      </div>
   );
}

export default PlayoffBracketLeaderboard;
