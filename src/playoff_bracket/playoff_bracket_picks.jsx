import React, { useState } from "react";
import { API } from "aws-amplify";
import "./playoff_bracket_picks.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

const playoffTeams2025 = {
   "N1": { name: "Vikings", seed: 1 },
   "N2": { name: "49ers", seed: 2 },
   "N3": { name: "Commanders", seed: 3 },
   "N4": { name: "Saints", seed: 4 },
   "N5": { name: "Packers", seed: 5 },
   "N6": { name: "Lions", seed: 6 },
   "N7": { name: "Bears", seed: 7 },
   "A1": { name: "Ravens", seed: 1 },
   "A2": { name: "Bills", seed: 2 },
   "A3": { name: "Chiefs", seed: 3 },
   // "A4": { name: "Texans", seed: 4 },
   "A5": { name: "Browns", seed: 5 },
   "A6": { name: "Dolphins", seed: 6 },
   "A7": { name: "Steelers", seed: 7 },
}

function PlayoffBracketPicks( props )
{
   const [nfcWildcardGames, setNfcWildcardGames] = useState( [ ] );
   const [afcWildcardGames, setAfcWildcardGames] = useState( [ ] );
   var teams = playoffTeams2025;

   React.useEffect( ( ) => {
      API.get( apiName, "/?table=playoffTeams" )
         .then( response => {

            // If the teams are already loaded, save time by using those. Fetching teams
            // from the database takes about 1 second.
            if (!teams || teams.length === 0 )
            {
               teams = parseTeamsFromApiResponse( response, props.currentYear );
            }

            // Make a list of NFC teams that play each other (2 & 7, 3 & 6, 4 & 5)
            setNfcWildcardGames ( createWildcardGames( teams, "N" ) );
            
            // Make a list of AFC teams that play each other (2 & 7, 3 & 6, 4 & 5)
            setAfcWildcardGames ( createWildcardGames( teams, "A" ) );
            console.log(createWildcardGames( teams, "A" ));
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
         {/* AFC Wild Card */
            afcWildcardGames.map( ( game, index ) =>
               <PlayoffBracketGame
                  gridRow={ ( 2 * index + 1) + " / span 2" }
                  gridColumn="1"
                  game={game}
                  key={index}
               />
            )
         }
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
   const homeTeam = (props.game.homeTeam)
      ? props.game.homeTeam
      : {name: "Empty", seed: ""};
   const awayTeam = (props.game.awayTeam)
      ? props.game.awayTeam
      : {name: "Empty", seed: ""};

   return (
      <div className="playoff-bracket-game"
           style={{ gridRow: props.gridRow, gridColumn: props.gridColumn }}
      >
         <div className="playoff-bracket-team">
            <img src={"/images/teams/" + homeTeam.name + "-logo.png"} alt={ homeTeam.name + " Logo" } />
            <h4>{ homeTeam.seed }</h4>
            <h3>{ homeTeam.name }</h3>
         </div>
         <div className="playoff-bracket-team">
            <img src={"/images/teams/" + awayTeam.name + "-logo.png"} alt={awayTeam.name} />
            <h4>{ awayTeam.seed }</h4>
            <h3>{ awayTeam.name }</h3>
         </div>
      </div>
   )
}

// Parse response to get teams as a dictionary that can be accessed
// through conference and seed (e.g., "N1")
function parseTeamsFromApiResponse( response, currentYear )
{
   var teams = {};

   response.forEach( team => 
   {
      // Only take teams from this year
      if ( team.year === currentYear )
      {
         teams[team.position] = {
            name: team.team,
            seed: Number(team.position[1])
         };
      }
   });

   return teams;
}

// Use dictionary of teams referenced by position (e.g., "N1")
// within a conference "N" or "A" to create the structure of wildcard games.
// 2 seed plays 7 seed, 3 seed plays 6 seed, 4 seed plays 5 seed.
function createWildcardGames( teams, conference )
{
   return [
      {
         homeTeam: teams[ conference + "2" ],
         awayTeam: teams[ conference + "7" ],
         winner: 0
      },
      {
         homeTeam: teams[ conference + "3" ],
         awayTeam: teams[ conference + "6" ],
         winner: 0
      },
      {
         homeTeam: teams[ conference + "4" ],
         awayTeam: teams[ conference + "5" ],
         winner: 0
      },
   ];
}

export default PlayoffBracketPicks;
