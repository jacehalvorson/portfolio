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
      if ( isNaN( Number( index ) ) || Number( index ) < 0 || Number( index ) > 12 ||
           isNaN( Number( value ) ) || Number( value ) < 0 || Number( value ) > 2 )
      {
         console.error( "Cannot update pick " + index + " with value " + value );
         return;
      }

      // Take the existing picks before and after the index, but replace to value at the index
      // e.g., "1121" + "2" + "00000"
      let newPicks = picks;
      newPicks = picks.substring(0, index) + value + picks.substring(index + 1);
      setPicks( newPicks );
   }

   // Update teams when the page loads
   React.useEffect( ( ) => {
      // If the teams are already loaded, save time by using those.
      if ( DISABLE_API_CALL ) return;

      // Retrieve the teams from the "playoffTeams" DynamoDB table using the API
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
                  seed: Number( team.position[1] )
               };
            }
         });
      
         setPlayoffTeams( teams );
      })
      .catch( err => {
         console.log( "Error fetching teams from API and parsing" );
         console.error( err );
      })
   }, [ props.currentYear ] );

   // Update all the Wild Card games when the playoff teams or picks change
   React.useEffect( ( ) => {
      // Make a list of NFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setNfcWildcardGames( computeWildcardGames( playoffTeams, "N", picks.substring( 0, 3 ) ) );

      // Make a list of AFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setAfcWildcardGames( computeWildcardGames( playoffTeams, "A", picks.substring( 3, 6 ) ) );
   }, [ playoffTeams, picks ] );

   // Update the NFC Divisional games when Wild Card games update
   React.useEffect( ( ) =>
   {
      setNfcDivisionalGames( computeDivisionalGames( nfcWildcardGames, playoffTeams[ "N1" ], picks.substring( 6, 8 ) ) );
   }, [ nfcWildcardGames, playoffTeams, picks ] );
      
   // Update the AFC Divisional games when Wild Card games update
   React.useEffect( ( ) =>
   {
      setAfcDivisionalGames( computeDivisionalGames( afcWildcardGames, playoffTeams[ "A1" ], picks.substring( 8, 10 ) ) );
   }, [ afcWildcardGames, playoffTeams, picks ] );

   // Update the AFC Championship when Divisional Games update
   React.useEffect( ( ) =>
   {
      setAfcChampionship( computeChampionshipGame( afcDivisionalGames, picks.substring( 11, 12 ) ) );
   }, [ afcDivisionalGames, picks ] );

   // Update the NFC Championship when Divisional Games update
   React.useEffect( ( ) =>
   {
      setNfcChampionship( computeChampionshipGame( nfcDivisionalGames, picks.substring( 10, 11 ) ) );
   }, [ nfcDivisionalGames, picks ] );

   return (
      <div id="playoff-bracket-picks">
         {/* NFC Wild Card */
         nfcWildcardGames.map( ( game, index ) =>
            <PlayoffBracketGame
               gridRow={ ( 2 * index + 1 ) + " / span 2" }
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
               gridRow={ ( 2 * index + 1 ) + " / span 2" }
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
               gridRow={ ( 2 * index + 2 ) + " / span 2" }
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
               gridRow={ ( 2 * index + 2 ) + " / span 2" }
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

// Given the wildcard games and the picks, compute the divisional games.
// conference is either "N" or "A" for NFC or AFC.
// wildcardPicks is a string with 3 characters. e.g., "011" means the first game is
// unpicked and the second and third games are picked for the home team, where the
// first game is defined as the highest seed playing the lowest seed.
function computeWildcardGames( playoffTeams, conference, wildcardPicks )
{
   return [
   {
      homeTeam: playoffTeams[ conference + "2" ],
      awayTeam: playoffTeams[ conference + "7" ],
      winner: Number(wildcardPicks[0])
   },
   {
      homeTeam: playoffTeams[ conference + "3" ],
      awayTeam: playoffTeams[ conference + "6" ],
      winner: Number(wildcardPicks[1])
   },
   {
      homeTeam: playoffTeams[ conference + "4" ],
      awayTeam: playoffTeams[ conference + "5" ],
      winner: Number(wildcardPicks[2])
   }];
}

// Given the wildcard games, the bye team, and the picks, compute the divisional games.
// divisionalPicks is a string with 2 charactes. e.g., "01" means the first game is
// unpicked and the second game is picked for the home team, where the first game
// is defined as the highest seed playing the lowest seed.
function computeDivisionalGames( wildcardGames, byeTeam, divisionalPicks )
{
   let divisionalTeams = [ byeTeam ];
   let divisionalGames = [ ];

   wildcardGames.forEach( game =>
   {
      if ( game.winner === 1 )
      {
         divisionalTeams.push( game.homeTeam );
      }
      else if ( game.winner === 2 )
      {
         divisionalTeams.push( game.awayTeam );
      }
      // For games with no team picked (0), do nothing
   });

   // Sort teams by seed
   divisionalTeams.sort( ( a, b ) => a.seed - b.seed );

   // Repeatedly take the highest and lowest seeds to play each other
   // until there are no more teams left
   while ( divisionalTeams.length > 0 )
   {
      divisionalGames.push({
         // Home team is the highest seed
         homeTeam: divisionalTeams[0],
         // Away team is the lowest seed or use null if there is no other team
         awayTeam: ( divisionalTeams.length > 1 )
            ? divisionalTeams.at( -1 )
            : null,
         // Leave win prediction blank
         winner: 0
      });

      // Take off the teams just used
      if ( divisionalTeams.length > 1 )
         divisionalTeams = divisionalTeams.slice( 1, ( divisionalTeams.length - 1 ) );
      else
         divisionalTeams = [ ];
   }

   // If there is only one game, add an empty one
   if ( divisionalGames.length === 1 )
   {
      divisionalGames.push( emptyGame );
   }

   // Incorporate picks into the divisional games
   divisionalGames[0].winner = Number( divisionalPicks[0] );
   divisionalGames[1].winner = Number( divisionalPicks[1] );

   return divisionalGames;
}

// Given the divisional games and the championship pick, compute the championship game
// championshipPick is a string with 1 character. e.g., "1" means the home team won.
function computeChampionshipGame( divisionalGames, championshipPick )
{
   let championshipTeams = [ ];

   divisionalGames.forEach( game =>
   {
      if ( game.winner === 1 && game.homeTeam )
      {
         championshipTeams.push( game.homeTeam );
      }
      else if ( game.winner === 2 && game.awayTeam )
      {
         championshipTeams.push( game.awayTeam );
      }
      // For games with no team picked (0), do nothing
   });

   if ( championshipTeams.length === 0 )
   {
      return emptyGame;
   }

   // Sort teams by seed
   championshipTeams.sort( ( a, b ) => a.seed - b.seed );

   return {
      homeTeam: championshipTeams[0],
      awayTeam: ( championshipTeams.length > 1 )
         ? championshipTeams[1]
         : null,
      winner: Number( championshipPick )
   };
}

export default PlayoffBracketPicks;
