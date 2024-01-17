import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_entry.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

async function addBracketToFile( setPostStatus )
{
   let name = document.getElementById("name-input").value;
   let picks = document.getElementById("picks-input").value;
   let tiebreaker = document.getElementById("tiebreaker-input").value;
   tiebreaker = Number(tiebreaker);

   if ( name === "" ||
        picks === "" ||
        isNaN(Number(picks)) ||
        picks.length != 13 ||
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
         console.log( response );
         setPostStatus( "Success" );
      })
      .catch( err => {
         console.error( err );
         setPostStatus( "Error adding bracket to API" );
      });
}

function PlayoffBracketEntry( )
{
   const [ postStatus, setPostStatus ] = useState( "" );

   return (
      <main id="playoff-bracket-entry">
         <a href="/playoffbracket">
            <div id="back-button">
               {/* Left arrow icon */}
               <svg
                  id="home-arrow-left"
                  className="home-arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  >
                  <path d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"/>
               </svg>

               <h2>Leaderboard</h2>
            </div>
         </a>

         <h1 className="title">Enter data for 2024 playoff bracket:</h1>
         <h2>Name</h2>
         <input type="text" placeholder="Jace" id="name-input"/>
         <h2>Picks (number found in URL)</h2>
         <input type="text" placeholder="1211111111111" id="picks-input" />
         <h2>Super Bowl total score (tiebreaker)</h2>
         <input type="text" placeholder="53" id="tiebreaker-input" />
         <button
            id="add-to-leaderboard"
            onClick={ ( ) => addBracketToFile( setPostStatus ) }
         >
            Add to Leaderboard</button>

         <h2>{ postStatus }</h2>
      </main>
   );
}

export default PlayoffBracketEntry;