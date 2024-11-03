import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_picks.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

function PlayoffBracketPicks( props )
{
   const [nfcWildcardGames, setNfcWildcardGames] = useState( [ ] );
   const [afcWildcardGames, setAfcWildcardGames] = useState( [ ] );

   React.useEffect( ( ) => {
      API.get( apiName, "/?table=playoffTeams" )
         .then( response => {
            // Parse response to get teams
            var teams = [];
            response.forEach( team => 
            {
               // Only take teams from this year
               if (team.year === props.currentYear)
               {
                  teams.push({
                     // Parse "N1" into conference and seed
                     conference: team.position[0],
                     seed: Number(team.position[1]),
                     // Get team name
                     name: team.team
                  })
               }
            });

            // Make a list of NFC teams that play each other (2 & 7, 3 & 6, 4 & 5)
            setNfcWildcardGames ( [
            {
               homeTeam: teams.filter( team => team.conference === "N" && team.seed === 2 )[0],
               awayTeam: teams.filter( team => team.conference === "N" && team.seed === 7 )[0],
               winner: 0
            },
            {
               homeTeam: teams.filter( team => team.conference === "N" && team.seed === 3 )[0],
               awayTeam: teams.filter( team => team.conference === "N" && team.seed === 6 )[0],
               winner: 0
            },
            {
               homeTeam: teams.filter( team => team.conference === "N" && team.seed === 4 )[0],
               awayTeam: teams.filter( team => team.conference === "N" && team.seed === 5 )[0],
               winner: 0
            },
            ]);
            
            // Make a list of AFC teams that play each other (2 & 7, 3 & 6, 4 & 5)
            setAfcWildcardGames ( [
            {
               homeTeam: teams.filter( team => team.conference === "A" && team.seed === 2 )[0],
               awayTeam: teams.filter( team => team.conference === "A" && team.seed === 7 )[0],
               winner: 0
            },
            {
               homeTeam: teams.filter( team => team.conference === "A" && team.seed === 3 )[0],
               awayTeam: teams.filter( team => team.conference === "A" && team.seed === 6 )[0],
               winner: 0
            },
            {
               homeTeam: teams.filter( team => team.conference === "A" && team.seed === 4 )[0],
               awayTeam: teams.filter( team => team.conference === "A" && team.seed === 5 )[0],
               winner: 0
            },
            ]);
         })
         .catch( err => {
            console.log( "Error fetching teams from API and parsing" );
            console.error( err );
         })
   }, [ ] );

   return (
      <div id="playoff-bracket-picks">
         {/* NFC Wild Card */
            nfcWildcardGames.map( ( game, index ) =>
               <PlayoffBracketGame
                  gridRow={ ( 2 * index + 1) + " / span 2" }
                  gridColumn="7"
                  game={game}
                  key={index}
               />
            )
         }
         {/* AFC Wild Card */}
         {/* <PlayoffBracketGame gridRow="1 / span 2" gridColumn="1" /> */}
         {/* <PlayoffBracketGame gridRow="3 / span 2" gridColumn="1" /> */}
         {/* <PlayoffBracketGame gridRow="5 / span 2" gridColumn="1" /> */}
         {/* NFC Divisional */}
         {/* <PlayoffBracketGame gridRow="2 / span 2" gridColumn="6" /> */}
         {/* <PlayoffBracketGame gridRow="4 / span 2" gridColumn="6" /> */}
         {/* AFC Wild Card */}
         {/* <PlayoffBracketGame gridRow="2 / span 2" gridColumn="2" /> */}
         {/* <PlayoffBracketGame gridRow="4 / span 2" gridColumn="2" /> */}
         {/* NFC Divisional */}
         {/* <PlayoffBracketGame gridRow="3 / span 2" gridColumn="5" /> */}
         {/* AFC Wild Card */}
         {/* <PlayoffBracketGame gridRow="3 / span 2" gridColumn="3" /> */}
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
      <div className="playoff-bracket-game"
           style={{ gridRow: props.gridRow, gridColumn: props.gridColumn }}
      >
         <div className="playoff-bracket-team">
            <img src={"/images/teams/" + props.game.homeTeam.name + "-logo.png"} alt={ props.game.homeTeam.name } />
            <h3>{ props.game.homeTeam.name }</h3>
         </div>
         <div className="playoff-bracket-team">
            <img src={"/images/teams/" + props.game.awayTeam.name + "-logo.png"} alt={props.game.awayTeam.name} />
            <h3>{ props.game.awayTeam.name }</h3>
         </div>
      </div>
   )
}

export default PlayoffBracketPicks;
