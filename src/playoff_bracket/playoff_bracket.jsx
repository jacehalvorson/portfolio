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
   // focus is 0 leaderboard and 1 for picks
   const [focus, setFocus] = React.useState( 1 );
   const [picks, setPicks] = React.useState( "0000000000000" );
   
   React.useEffect( ( ) => {
      setFocus(1);
   }, [ picks ] );

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
                  value={0}
                  style={{fontSize: "inherit"}}
                  aria-label="leaderboard button"
               >
                  Leaderboard
               </ToggleButton>
               <ToggleButton
                  value={1}
                  style={{fontSize: "inherit"}}
                  aria-label="picks button"
               >
                  Picks
               </ToggleButton>
               <ToggleButton
                  value={2}
                  style={{fontSize: "inherit"}}
                  aria-label="admin button"
               >
                  Admin
               </ToggleButton>
            </ToggleButtonGroup>
         </div>

         <div id="playoff-bracket-content" style={{ marginLeft: `${ focus * -100 }vw` }}>
            <PlayoffBracketLeaderboard deviceId={deviceId} setPicks={setPicks} />
            <PlayoffBracketPicks currentYear={CurrentYear()} picks={picks} setPicks={setPicks} />
            <PlayoffBracketEntry deviceId={deviceId} />
         </div>

         <div id="playoff-bracket-background-picture" />
      </main>
   );
}

export default PlayoffBracket;
