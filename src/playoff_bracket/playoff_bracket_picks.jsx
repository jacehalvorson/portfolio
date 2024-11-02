import "./playoff_bracket_picks.css";
import "../index.css";

function PlayoffBracketPicks( )
{
   return (
      <div id="playoff-bracket-picks">
         {/* NFC Wild Card */}
         <PlayoffBracketGame gridRow="1 / span 2" gridColumn="7" />
         <PlayoffBracketGame gridRow="3 / span 2" gridColumn="7" />
         <PlayoffBracketGame gridRow="5 / span 2" gridColumn="7" />
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
               <div class="super-bowl-team">
                  <img src="/images/teams/Bills-logo.png" alt="Team 1" />
               </div>
               <div class="super-bowl-team">
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
      <div class="playoff-bracket-game" style={{gridRow: props.gridRow, gridColumn: props.gridColumn }}>
         <div class="playoff-bracket-team">
            <img src="/images/teams/Bills-logo.png" alt="Team 1" />
            <h3>Team</h3>
         </div>
         <div class="playoff-bracket-team">
            <img src="/images/teams/Bills-logo.png" alt="Team 2" />
            <h3>Team</h3>
         </div>
      </div>
   )
}

export default PlayoffBracketPicks;
