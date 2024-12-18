import { useState, useEffect } from "react";
import { API } from "aws-amplify";

import { emptyGame,
         computeWildcardGames,
         computeDivisionalGames,
         computeChampionshipGame,
         computeSuperBowl,
         nflTeamColors
} from "./playoff_bracket_utils"
import submitBracket from "./playoff_bracket_submit_bracket";

import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import "./playoff_bracket_picks.css";
import "../index.css";

const apiName = "apiplayoffbrackets";

// Temporarily use local teams instead of fetching from database
const DISABLE_API_CALL = true;
export const playoffTeams2025 = {
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

const TiebreakerInput = styled(TextField)({
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: 'white',
      },
      '&:hover fieldset': {
         borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'white',
      },
   },
   '& label': {
      color: 'white'
   },
   '& input': {
      color: 'white'
   },
   '& label.Mui-focused': {
     color: 'white',
   },
});

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
   const [tiebreaker, setTiebreaker] = useState( "" );
   const [submitStatus, setSubmitStatus] = useState( "" );

   const currentYear = props.currentYear
   const picks = props.picks;

   const updatePick = ( index, value ) =>
   {
      if ( isNaN( Number( index ) ) || Number( index ) < 0 || Number( index ) > 12 ||
           isNaN( Number( value ) ) || Number( value ) < 0 || Number( value ) > 2 )
      {
         console.error( "Cannot update pick " + index + " with value " + value );
         return;
      }

      // Take the existing picks before and after the index, but replace to value at the index
      // e.g., "1121" + "2" + "00000000"
      let newPicks = picks.substring(0, index) +
                     value.toString() +
                     picks.substring(index + 1);
      props.setPicks( newPicks );
   }

   // Update teams when the page loads
   useEffect( ( ) => {
      // If the teams are already loaded, save time by using those.
      if ( DISABLE_API_CALL ) return;

      // Retrieve the teams from the "playoffTeams" DynamoDB table using the API
      API.get( apiName, "/?table=playoffTeams" )
      .then( response => {
         var teams = {};

         response.forEach( team => 
         {
            // Only take teams from this year
            if ( team.year === currentYear )
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
   }, [ currentYear ] );

   // Update all the Wild Card games when the playoff teams or picks change
   useEffect( ( ) => {
      // Make a list of AFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setAfcWildcardGames( computeWildcardGames( "A", picks.substring( 0, 3 ) ) );

      // Make a list of NFC Wild Card teams that play each other (2 & 7, 3 & 6, 4 & 5)
      setNfcWildcardGames( computeWildcardGames( "N", picks.substring( 3, 6 ) ) );

      // Reset the submit status when the picks change
      setSubmitStatus( "Submit" );
   }, [ picks ] );

   // Update the AFC Divisional games when Wild Card games update
   useEffect( ( ) =>
   {
      setAfcDivisionalGames( computeDivisionalGames( afcWildcardGames, "A", picks.substring( 6, 8 ) ) );
   }, [ afcWildcardGames, playoffTeams, picks ] );

   // Update the NFC Divisional games when Wild Card games update
   useEffect( ( ) =>
   {
      setNfcDivisionalGames( computeDivisionalGames( nfcWildcardGames, "N", picks.substring( 8, 10 ) ) );
   }, [ nfcWildcardGames, playoffTeams, picks ] );

   // Update the AFC Championship when Divisional Games update
   useEffect( ( ) =>
   {
      setAfcChampionship( computeChampionshipGame( afcDivisionalGames, picks.substring( 10, 11 ) ) );
   }, [ afcDivisionalGames, picks ] );

   // Update the NFC Championship when Divisional Games update
   useEffect( ( ) =>
   {
      setNfcChampionship( computeChampionshipGame( nfcDivisionalGames, picks.substring( 11, 12 ) ) );
   }, [ nfcDivisionalGames, picks ] );

   // Update the Super Bowl when either Championship game updates
   useEffect( ( ) =>
   {
      setSuperBowl( computeSuperBowl( afcChampionship, nfcChampionship, picks.substring( 12, 13 ) ) );
   }, [ nfcChampionship, afcChampionship, picks ] );

   return (
      <div id="playoff-bracket-picks">
         <div id="playoff-bracket-wildcard-games">
            <h2>Wild Card Games</h2>
            <div className="playoff-bracket-afc">
               {afcWildcardGames.map( ( game, index ) =>
                  <PlayoffBracketGame
                     game={game}
                     key={index}
                     pickIndex={index}
                     updatePick={updatePick}
                     playoffTeams={playoffTeams}
                  />
               )}
            </div>
            <div className="playoff-bracket-nfc">
               {nfcWildcardGames.map( ( game, index ) =>
                  <PlayoffBracketGame
                     game={game}
                     key={index}
                     pickIndex={index + 3}
                     updatePick={updatePick}
                     playoffTeams={playoffTeams}
                  />
               )}
            </div>
         </div>

         <div id="playoff-bracket-divisional-games">
            <div className="playoff-bracket-afc">
               <h2>AFC Divisional Games</h2>
               {afcDivisionalGames.map( ( game, index ) =>
                  <PlayoffBracketGame
                     game={game}
                     key={index}
                     pickIndex={index + 6}
                     updatePick={updatePick}
                     playoffTeams={playoffTeams}
                  />
               )}
            </div>
            <div className="playoff-bracket-nfc">
               <h2>NFC Divisional Games</h2>
               {nfcDivisionalGames.map( ( game, index ) =>
                  <PlayoffBracketGame
                     game={game}
                     key={index}
                     pickIndex={index + 8}
                     updatePick={updatePick}
                     playoffTeams={playoffTeams}
                  />
               )}
            </div>
         </div>

         <div id="playoff-bracket-championships">
            <div className="playoff-bracket-afc">
               <h2>AFC Championship</h2>
               <PlayoffBracketGame
                  game={afcChampionship}
                  pickIndex={10}
                  updatePick={updatePick}
                  playoffTeams={playoffTeams}
               />
            </div>
            <div className="playoff-bracket-nfc">
               <h2>NFC Championship</h2>
               <PlayoffBracketGame
                  game={nfcChampionship}
                  pickIndex={11}
                  updatePick={updatePick}
                  playoffTeams={playoffTeams}
               />
            </div>
         </div>

         <div id="playoff-bracket-super-bowl">
            {/* Super Bowl */
            /* In this special case, "homeTeam" is the AFC team
               and "awayTeam" is the NFC team" */}
            <div id="super-bowl">
               <h2>Super Bowl</h2>

               <PlayoffBracketGame
                  game={superBowl}
                  pickIndex={12}
                  updatePick={updatePick}
                  playoffTeams={playoffTeams}
               />

               <TiebreakerInput
                  label="Total Score"
                  id="tiebreaker-input"
                  variant="outlined"
                  size="small"
                  inputMode="numeric"
                  style={{ marginTop: "1em" }}
                  onChange={( event ) => {
                     setTiebreaker( parseInt( event.target.value ));
                  }}
               />
            </div>
         </div>

         {/* If the input isn't valid don't allow submision */}
         {( !picks || picks.includes("0") || picks.length !== 13 ||
            !tiebreaker || isNaN( tiebreaker ) || tiebreaker < 0 )
         
         // Picks are not filled out, disable submission
         ? <Button
            id="submit-picks-button"
            variant="outlined"
            size="large"
            style={{marginTop: "-3em"}}
         >
            Submit
         </Button>

         // Picks are filled out, allow submission
         : <Button
            id="submit-picks-button"
            variant="contained"
            style={{marginTop: "-3em"}}
            size="large"
            onClick={() =>
            {
               submitBracket( setSubmitStatus, props.deviceId, picks, tiebreaker, props.setNewBracketSubmitted );
            }}
         >
            { ( submitStatus === "" ) ? "Submit" : submitStatus }
         </Button>
         }
      </div>
   );
}

function PlayoffBracketGame( props )
{
   const homeTeam = props.playoffTeams[props.game.homeTeam];
   const awayTeam = props.playoffTeams[props.game.awayTeam];
   const winner = props.game.winner;
   // Place items at the end in the super bowl
   const justifyContentValue = ( props.pickIndex === 12 ) ? "flex-end" : "flex-start";

   const changeHandler = ( event, newWinner ) =>
   {
      // If deselected, set to 0.
      // Otherwise, set to the new winner (1 for home or 2 for away)
      props.updatePick( props.pickIndex, ( newWinner === null ) ? 0 : newWinner );
   }
   
   return (
      <ToggleButtonGroup className="playoff-bracket-game"
                         onChange={changeHandler}
                         exclusive
                         value={winner}
                         style={{ borderRadius: "1em" }}
      >
         {[ homeTeam, awayTeam ].map( ( team, index ) =>
         {
            const styles = {
               borderRadius: "1em",
               justifyContent: justifyContentValue,
               fontSize: "0.7em",
               backgroundColor: ( ( winner === ( index + 1 ) ) && team && team.name && nflTeamColors[team.name] )
                  ? nflTeamColors[team.name]
                  : "white"
            };
            if ( team )
            {
               return <ToggleButton
                  className="playoff-bracket-team"
                  sx={{bgcolor: "white"}}
                  style={styles}
                  value={index + 1}
                  key={index}
               >
                  <div className="image-container">
                     <img src={"/images/teams/" + team.name + "-logo.png"} alt={ team.name + " Logo" } />
                  </div>
                  <h3>{ team.seed }</h3>
                  <h2 style={{color: "black"}}>{ team.name }</h2>
               </ToggleButton>
            }
            else
            {
               return <ToggleButton
                  className="playoff-bracket-team"
                  sx={{bgcolor: "white"}}
                  style={{backgroundColor: "white", borderRadius: "1em", justifyContent: justifyContentValue, fontSize: "0.7em"}}
                  value={-1}
                  disabled
                  key={index}
               />
            }
         })}
      </ToggleButtonGroup>
   )
}

export default PlayoffBracketPicks;
