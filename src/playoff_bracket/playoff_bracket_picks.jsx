import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_picks.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketPicks( props )
{
   const [teams, setTeams] = useState( [ ] );

   React.useEffect( ( ) => {
      API.get( apiName, "/?table=playoffTeams" )
         .then( response => {
            // Parse response to get teams
            var tempTeams = [];
            response.forEach( team => 
            {
               // Only take teams from this year
               if (team.year === props.currentYear)
               {
                  tempTeams.push({
                     // Parse "N1" into conference and seed
                     conference: team.position[0],
                     seed: Number(team.position[1]),
                     // Get team name
                     name: team.team
                  })
               }
            });

            setTeams( tempTeams );
         })
         .catch( err => {
            console.log( "Error fetching teams from API" );
            console.error( err );
         });
   }, [ ] );

   return (
      <div id="playoff-bracket-picks">
         {/* NFC Wild Card */
            teams.filter( team => team.conference === "N" && team.seed >= 2)
            .map( ( team, index ) => <PlayoffBracketGame gridRow={ ( 2 * index + 1) + " / span 2" } gridColumn="7" /> )
         }
         {/* AFC Wild Card */}
         <PlayoffBracketGame gridRow="1 / span 2" gridColumn="1" />
         <PlayoffBracketGame gridRow="3 / span 2" gridColumn="1" />
         <PlayoffBracketGame gridRow="5 / span 2" gridColumn="1" />
         {/* NFC Divisional */}
         <PlayoffBracketGame gridRow="2 / span 2" gridColumn="6" />
         <PlayoffBracketGame gridRow="4 / span 2" gridColumn="6" />
         {/* AFC Wild Card */}
         <PlayoffBracketGame gridRow="2 / span 2" gridColumn="2" />
         <PlayoffBracketGame gridRow="4 / span 2" gridColumn="2" />
         {/* NFC Divisional */}
         <PlayoffBracketGame gridRow="3 / span 2" gridColumn="5" />
         {/* AFC Wild Card */}
         <PlayoffBracketGame gridRow="3 / span 2" gridColumn="3" />
         {/* Super Bowl */}
         <div id="super-bowl">
            <div id="super-bowl-teams-wrapper">
               <div className="super-bowl-team">
                  <img src="/images/teams/Bills-logo.png" alt="Team 1" />
               </div>
               <div className="super-bowl-team">
                  <img src="/images/teams/Bills-logo.png" alt="Team 2" />
               </div>
            </div>
            <input id="super-bowl-tiebreaker" type="text" placeholder="0"/>
         </div>
      </div>
   );
}

function PlayoffBracketGame( props )
{
   return (
      <div className="playoff-bracket-game" style={{gridRow: props.gridRow, gridColumn: props.gridColumn }}>
         <div className="playoff-bracket-team">
            <img src="/images/teams/Bills-logo.png" alt="Team 1" />
            <h3>Team</h3>
         </div>
         <div className="playoff-bracket-team">
            <img src="/images/teams/Bills-logo.png" alt="Team 2" />
            <h3>Team</h3>
         </div>
      </div>
   )
}

export default PlayoffBracketPicks;
