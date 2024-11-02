import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_entry.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

async function addBracketToTable( setPostStatus )
{
   let name = document.getElementById("name-input").value;
   let picks = document.getElementById("picks-input").value;
   let tiebreaker = document.getElementById("tiebreaker-input").value;
   tiebreaker = Number(tiebreaker);

   if ( name === "" ||
        picks === "" ||
        isNaN(Number(picks)) ||
        picks.length !== 13 ||
        isNaN(tiebreaker) ||
        tiebreaker < 0
        )
   {
      console.log( "Invalid input: name: " + name + ", picks: " + picks + ", tiebreaker: " + tiebreaker + " }" );
      setPostStatus( "Invalid input" );
      return;
   }

   setPostStatus( "Adding bracket to leaderboard..." );

   let bracketData = {
      name: name,
      picks: picks,
      tiebreaker: tiebreaker
   };

   API.post( apiName, "/", {
      headers: {
         "Content-Type": "application/json"
      },
      // Send bracket data
      body: bracketData
   })
      .then( response => {
         setPostStatus( "Success" );
      })
      .catch( err => {
         console.error( err );
         setPostStatus( "Error adding bracket to API" );
      });
}

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
            onClick={ ( ) => addBracketToTable( setPostStatus ) }
         >
            Add to Leaderboard
         </button>

         <h2>{ postStatus }</h2>
      </main>
   );
}

export default PlayoffBracketEntry;