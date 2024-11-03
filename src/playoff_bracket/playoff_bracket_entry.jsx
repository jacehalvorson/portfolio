import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_entry.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketEntry( props )
{
   const [ postStatus, setPostStatus ] = useState( "" );

   return (
      <main id="playoff-bracket-entry">
         <h2> { props.deviceId } </h2>
         <h2>Name</h2>
         <input type="text" placeholder="Jace" id="name-input"/>
         <h2>Picks (number found in URL)</h2>
         <input type="text" placeholder="1211111111111" id="picks-input" />
         <h2>Super Bowl total score (tiebreaker)</h2>
         <input type="text" placeholder="53" id="tiebreaker-input" />
         <button
            id="add-to-leaderboard"
            onClick={ ( ) => addBracketToTable( setPostStatus, props.deviceId ) }
         >
            Add to Leaderboard
         </button>

         <h2>{ postStatus }</h2>
      </main>
   );
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
         if ( player.devices.length > 0 && !player.devices.find( entry => entry === deviceId ) )
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

export default PlayoffBracketEntry;
