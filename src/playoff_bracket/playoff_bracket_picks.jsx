import React, { useState } from "react";
import { API } from "aws-amplify";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import "./playoff_bracket_picks.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

// Temporarily use local teams instead of fetching from database
const DISABLE_API_CALL = true;
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
   const [picks, setPicks] = useState( "1110000000000" );

   const updatePick = ( index, value ) =>
   {
      let newPicks = picks;
      newPicks = picks.substring(0, index) + value + picks.substring(index + 1);
      setPicks( newPicks );
   }

   // Update teams when the page loads
   React.useEffect( ( ) => {
      // If the teams are already loaded, save time by using those.
      if ( !DISABLE_API_CALL )
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
   }, [ props.currentYear ] );

   // When the teams update, re-create wild card games
   React.useEffect( ( ) => {
      // Make a list of NFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setNfcWildcardGames( [
         {
            homeTeam: playoffTeams[ "N2" ],
            awayTeam: playoffTeams[ "N7" ],
            winner: Number(picks[0])
         },
         {
            homeTeam: playoffTeams[ "N3" ],
            awayTeam: playoffTeams[ "N6" ],
            winner: Number(picks[1])
         },
         {
            homeTeam: playoffTeams[ "N4" ],
            awayTeam: playoffTeams[ "N5" ],
            winner: Number(picks[2])
         }
      ]);

      // Make a list of AFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setAfcWildcardGames( [
         {
            homeTeam: playoffTeams[ "A2" ],
            awayTeam: playoffTeams[ "A7" ],
            winner: Number(picks[3])
         },
         {
            homeTeam: playoffTeams[ "A3" ],
            awayTeam: playoffTeams[ "A6" ],
            winner: Number(picks[4])
         },
         {
            homeTeam: playoffTeams[ "A4" ],
            awayTeam: playoffTeams[ "A5" ],
            winner: Number(picks[5])
         }
      ]);

      // Default divisonal games to have just the 1 seed for each conference
      setNfcDivisionalGames( [
         { homeTeam: playoffTeams[ "N1" ], awayTeam: null, winner: Number(picks[6]) },
         { homeTeam: null, awayTeam: null, winner: Number(picks[7])}
      ]);
      setAfcDivisionalGames ( [
         { homeTeam: playoffTeams[ "A1" ], awayTeam: null, winner: Number(picks[8]) },
         { homeTeam: null, awayTeam: null, winner: Number(picks[9])}
      ]);
   }, [ playoffTeams, picks ] );

   return (
      <div id="playoff-bracket-picks">
         {/* NFC Wild Card */
         nfcWildcardGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 1) + " / span 2" }
               gridColumn="7"
               game={game}
               key={index}
               pickIndex={index}
               updatePick={updatePick}
            />
         )}

         {/* AFC Wild Card */
         afcWildcardGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 1) + " / span 2" }
               gridColumn="1"
               game={game}
               key={index}
               pickIndex={index + 3}
               updatePick={updatePick}
            />
         )}

         {/* NFC Divisional */
         nfcDivisionalGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 2) + " / span 2" }
               gridColumn="6"
               game={game}
               key={index}
               pickIndex={index + 6}
               updatePick={updatePick}
            />
         )}

         {/* AFC Divisional */
         afcDivisionalGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 2) + " / span 2" }
               gridColumn="2"
               game={game}
               key={index}
               pickIndex={index + 8}
               updatePick={updatePick}
            />
         )}

         {/* NFC Championship */}
         <PlayoffBracketGame
            gridRow="3 / span 2"
            gridColumn="5"
            game={nfcChampionship}
            pickIndex={10}
            updatePick={updatePick}
         />

         {/* AFC Championship */}
         <PlayoffBracketGame
            gridRow="3 / span 2"
            gridColumn="3"
            game={afcChampionship}
            pickIndex={11}
            updatePick={updatePick}
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
   const winner = props.game.winner;

   const changeHandler = ( event, newWinner ) =>
   {
      if ( newWinner === null )
      {
         // Deselecting a winner, replace pick with 0
         props.updatePick( props.pickIndex, 0 );   
      }
      else
      {
         // Selecting a winner, replace pick with 1 or 2
         props.updatePick( props.pickIndex, newWinner );
      }
   }
   
   return (
      <ToggleButtonGroup className="playoff-bracket-game"
                         onChange={changeHandler}
                         exclusive
                         value={winner}
                         style={{ gridRow: props.gridRow, gridColumn: props.gridColumn, borderRadius: "1em" }}
      >
         {(props.game.homeTeam)
            ? <ToggleButton
                  className="playoff-bracket-team"
                  sx={{bgcolor: "white"}}
                  style={{borderRadius: "1em", justifyContent: "flex-start"}}
                  value={1}
              >
                 <img src={"/images/teams/" + homeTeam.name + "-logo.png"} alt={ homeTeam.name + " Logo" } />
                 <h4>{ homeTeam.seed }</h4>
                 <h3 style={{color: "black"}}>{ homeTeam.name }</h3>
              </ToggleButton>
            : <div className="playoff-bracket-team" />
         }
         {(props.game.awayTeam)
            ? <ToggleButton
                  className="playoff-bracket-team"
                  sx={{bgcolor: "white"}}
                  style={{borderRadius: "1em", justifyContent: "flex-start"}}
                  value={2}
              >
                 <img src={"/images/teams/" + awayTeam.name + "-logo.png"} alt={ awayTeam.name + " Logo" } />
                 <h4>{ awayTeam.seed }</h4>
                 <h3 style={{color: "black"}}>{ awayTeam.name }</h3>
              </ToggleButton>
            : <div className="playoff-bracket-team" />
         }
      </ToggleButtonGroup>
   )
}

export default PlayoffBracketPicks;
