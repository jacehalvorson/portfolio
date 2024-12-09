import React, { useState } from "react";

import { addBracketToTable } from "./playoff_bracket_utils";

import "./playoff_bracket_entry.css";
import "../index.css";

function PlayoffBracketEntry( props )
{
   const [ postStatus, setPostStatus ] = useState( "" );

   return (
      <main id="playoff-bracket-entry">
         <h2> { props.deviceId } </h2>
         <h2>Name</h2>
         <input type="text" placeholder="Jace" />
         <h2>Picks (number found in URL)</h2>
         <input type="text" placeholder="1211111111111" />
         <h2>Super Bowl total score (tiebreaker)</h2>
         <input type="text" placeholder="53" />
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

export default PlayoffBracketEntry;
