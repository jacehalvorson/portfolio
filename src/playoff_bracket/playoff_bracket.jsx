import {CurrentYear} from "./script.js";
// import PlayoffBracketLeaderboard from "./playoff_bracket_leaderboard.jsx";
import PlayoffBracketPicks from "./playoff_bracket_picks.jsx";
import "./playoff_bracket.css";
import "../index.css";

function getOrCreateDeviceId() 
{
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 9); // Generate a random string
      localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

function PlayoffBracket( )
{
   // Get the device ID which is comman for a single person.
   const deviceId = getOrCreateDeviceId();
   console.log("Device: " + deviceId);

   return (
      <main id="playoff-bracket">
         <a href={"/playoffbracket/entry?deviceID=" + getOrCreateDeviceId() } 
         >
            <div id="back-button">
               {/* Left arrow icon */}
               <svg
                  id="home-arrow-right"
                  className="home-arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  >
                  <path d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"/>
               </svg>
               <h2>Picks</h2>

            </div>
         </a>

         <h1>{ CurrentYear() } Playoff Bracket</h1>

         <PlayoffBracketPicks />
         
         <div id="playoff-bracket-background-picture" />
      </main>
   );
}

export default PlayoffBracket;
