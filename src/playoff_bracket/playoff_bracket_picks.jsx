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
   "A4": { name: "Texans", seed: 4 },
   "A5": { name: "Browns", seed: 5 },
   "A6": { name: "Dolphins", seed: 6 },
   "A7": { name: "Steelers", seed: 7 }
}

// const emptyGame = { homeTeam: null, awayTeam: { name: "Vikings", seed: 1 }, winner: 0 };
// const emptyGame = { homeTeam: { name: "Chiefs", seed: 3 }, awayTeam: { name: "Vikings", seed: 1 }, winner: 0 };
const emptyGame = { homeTeam: null, awayTeam: null, winner: 0 };

function PlayoffBracketPicks( props )
{
   const [nfcWildcardGames, setNfcWildcardGames] = useState( [emptyGame, emptyGame, emptyGame] );
   const [afcWildcardGames, setAfcWildcardGames] = useState( [emptyGame, emptyGame, emptyGame] );
   const [nfcDivisionalGames, setNfcDivisionalGames] = useState( [ emptyGame, emptyGame ] );
   const [afcDivisionalGames, setAfcDivisionalGames] = useState( [ emptyGame, emptyGame ] );
   const [nfcChampionship, setNfcChampionship] = useState( emptyGame );
   const [afcChampionship, setAfcChampionship] = useState( emptyGame );
   const [superBowl, setSuperBowl] = useState( emptyGame );
   const [playoffTeams, setPlayoffTeams] = useState( playoffTeams2025 );

   // Update teams when the page loads
   React.useEffect( ( ) => {
      // If the teams are already loaded, save time by using those.
      if ( !playoffTeams || Object.keys(playoffTeams).length === 0 )
      {
         API.get( apiName, "/?table=playoffTeams" )
         .then( response => {
            var teams = {};

            response.forEach( team => 
            {
               // Only take teams from this year
               if ( team.year === props.currentYear )
               {
                  teams[team.position] = {
                     name: team.team,
                     seed: Number(team.position[1])
                  };
               }
            });
         
            setPlayoffTeams( teams );
         })
         .catch( err => {
            console.log( "Error fetching teams from API and parsing" );
            console.error( err );
         })
      }
   }, [ ] );

   // When the teams update, re-create wild card games
   React.useEffect( ( ) => {
      // Make a list of Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setNfcWildcardGames( createWildcardGames( playoffTeams, "N" ) );
      setAfcWildcardGames( createWildcardGames( playoffTeams, "A" ) );

      // Default divisonal games to have just the 1 seed for each conference
      setNfcDivisionalGames( [
         { homeTeam: playoffTeams[ "N1" ], awayTeam: null, winner: 0 },
         { homeTeam: null, awayTeam: null, winner: 0}
      ]);
      setAfcDivisionalGames ( [
         { homeTeam: playoffTeams[ "A1" ], awayTeam: null, winner: 0 },
         { homeTeam: null, awayTeam: null, winner: 0}
      ]);

      // TODO incorporate picks

   }, [ playoffTeams ] );

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

         {/* NFC Divisional */
         nfcDivisionalGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 2) + " / span 2" }
               gridColumn="6"
               game={game}
               key={index}
            />
         )
         }

         {/* AFC Divisional */
         afcDivisionalGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 2) + " / span 2" }
               gridColumn="2"
               game={game}
               key={index}
            />
         )
         }

         {/* NFC Championship */}
         <PlayoffBracketGame
            gridRow="3 / span 2"
            gridColumn="5"
            game={nfcChampionship}
         />

         {/* AFC Championship */}
         <PlayoffBracketGame
            gridRow="3 / span 2"
            gridColumn="3"
            game={afcChampionship}
         />
         
         {/* Super Bowl */
         /* In this special case, "homeTeam" is the AFC team
            and "awayTeam" is the NFC team" */}
         <div id="super-bowl-grid-position">
            <div id="super-bowl">
               <div id="super-bowl-teams-wrapper">
                  {(superBowl.homeTeam)
                     ? <div className="super-bowl-team">
                          <img src={"/images/teams/" + superBowl.homeTeam.name + "-logo.png"} alt={ superBowl.homeTeam.name + " Logo" } />
                          <h3>{ superBowl.homeTeam.name }</h3>
                       </div>
                     : <div className="super-bowl-team" />}
                  {(superBowl.awayTeam)
                     ? <div className="super-bowl-team">
                          <img src={"/images/teams/" + superBowl.awayTeam.name + "-logo.png"} alt={ superBowl.awayTeam.name + " Logo" } />
                          <h3>{ superBowl.awayTeam.name }</h3>
                       </div>
                     : <div className="super-bowl-team" />}
               </div>
               <input id="super-bowl-tiebreaker" type="text" placeholder="0"/>
            </div>
         </div>
      </div>
   );
}

function PlayoffBracketGame( props )
{
   const homeTeam = props.game.homeTeam;
   const awayTeam = props.game.awayTeam;
   
   return (
      <div className="playoff-bracket-game"
           style={{ gridRow: props.gridRow, gridColumn: props.gridColumn }}
      >
         {(props.game.homeTeam)
            ? <div className="playoff-bracket-team">
                 <img src={"/images/teams/" + homeTeam.name + "-logo.png"} alt={ homeTeam.name + " Logo" } />
                 <h4>{ homeTeam.seed }</h4>
                 <h3>{ homeTeam.name }</h3>
              </div>
            : <div className="playoff-bracket-team" />
         }
         {(props.game.awayTeam)
            ? <div className="playoff-bracket-team">
                 <img src={"/images/teams/" + awayTeam.name + "-logo.png"} alt={ awayTeam.name + " Logo" } />
                 <h4>{ awayTeam.seed }</h4>
                 <h3>{ awayTeam.name }</h3>
              </div>
            : <div className="playoff-bracket-team" />
         }
      </div>
   )
}

// Use dictionary of teams referenced by position (e.g., "N1")
// within a conference "N" or "A" to create the structure of wildcard games.
// 2 seed plays 7 seed, 3 seed plays 6 seed, 4 seed plays 5 seed.
// "winner" value of 0 indicates no selection. 1 means home team won, 2 means away team won.
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
