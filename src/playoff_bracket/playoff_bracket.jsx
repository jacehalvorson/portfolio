import React from "react";
import {CurrentYear} from "./script.js";

import PlayoffBracketLeaderboard from "./playoff_bracket_leaderboard.jsx";
import PlayoffBracketPicks from "./playoff_bracket_picks.jsx";
import PlayoffBracketEntry from "./playoff_bracket_entry.jsx";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import "./playoff_bracket.css";
import "../index.css";

function getOrCreateDeviceId( ) 
{
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
      deviceId = Math.random( ).toString(36).substring(2, 9); // Generate a random string
      localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

function PlayoffBracket( )
{
   // Values: 'leaderboard', 'picks', 'admin'
   const [focus, setFocus] = React.useState( "picks" );
   
   const switchFocus = (event, newFocus) =>
   {
      if (newFocus !== null)
      {
         setFocus(newFocus);
      }
   }

   // Get the device ID which is common for a single person.
   const deviceId = getOrCreateDeviceId( );

   return (
      <main id="playoff-bracket">
         <h1>{ CurrentYear() } Playoff Bracket</h1>

         <div id="focus-selection-group">
            <ToggleButtonGroup
               onChange={switchFocus}
               value={focus}
               exclusive
               sx={{bgcolor: "white"}}
               aria-label="select-focus"
            >
               <ToggleButton
                  value="leaderboard"
                  aria-label="leaderboard button"
               >
                  Leaderboard
               </ToggleButton>
               <ToggleButton
                  value="picks"
                  aria-label="picks button"
               >
                  Picks
               </ToggleButton>
               <ToggleButton
                  value="admin"
                  aria-label="admin button"
               >
                  Admin
               </ToggleButton>
            </ToggleButtonGroup>
         </div>

         {( focus === "picks" )
            ? <PlayoffBracketPicks currentYear={CurrentYear()}/>
            : ( focus === "leaderboard" )
               ? <PlayoffBracketLeaderboard deviceId={deviceId} />
               : <PlayoffBracketEntry deviceId={deviceId}/>
         }

         <div id="playoff-bracket-background-picture" />
      </main>
   );
}

export default PlayoffBracket;
