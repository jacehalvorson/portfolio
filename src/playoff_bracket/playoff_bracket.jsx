import React, { useEffect, useState } from "react";
import getBrackets from "./script.js";
import "./playoff_bracket.css";
import "../index.css";

function PlayoffBracket( )
{
   const [ scores, setScores ] = useState( [] );
   
   useEffect( ( ) => {
      fetch( "/brackets.json" )
         .then( response => response.json( ) )
         .then( json => json.brackets )
         .then( ShortPath => getBrackets( ShortPath ) )
         .then( brackets => setScores( brackets.sort( ( a, b ) => b.pointsWon - a.pointsWon ) ) )
         .catch( err => console.error( err ) );
   }, [ ] );

   return (
      <main id="playoff-bracket">
         <h1 className="title">2024 Playoff Bracket Leaderboard</h1>
         
         <div className="leaderboard">
         {
            ( scores.length === 0 ) ? ( <h2>Loading...</h2> )
            : scores.map( ( player, index ) => {
               return (
                  <a href={"https://next.playoffpredictors.com/football/nfl/playoffpicture/37033920-C0E1-4EF4-8F0D-DA53DA41E3A0?L=" + player.shortPath + "&sbhomescore=0&sbawayscore=0"}>
                     <div className="player" key={index}>
                        <h2>{ player.name }</h2>
                        <h3>{ player.pointsWon }</h3>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                           <path fill="white" d="M6.879 9.934c-0.208 0-0.416-0.079-0.575-0.238-1.486-1.486-1.486-3.905 0-5.392l3-3c0.72-0.72 1.678-1.117 2.696-1.117s1.976 0.397 2.696 1.117c1.486 1.487 1.486 3.905 0 5.392l-1.371 1.371c-0.317 0.317-0.832 0.317-1.149 0s-0.317-0.832 0-1.149l1.371-1.371c0.853-0.853 0.853-2.241 0-3.094-0.413-0.413-0.963-0.641-1.547-0.641s-1.134 0.228-1.547 0.641l-3 3c-0.853 0.853-0.853 2.241 0 3.094 0.317 0.317 0.317 0.832 0 1.149-0.159 0.159-0.367 0.238-0.575 0.238z"></path>
                           <path fill="white" d="M4 15.813c-1.018 0-1.976-0.397-2.696-1.117-1.486-1.486-1.486-3.905 0-5.392l1.371-1.371c0.317-0.317 0.832-0.317 1.149 0s0.317 0.832 0 1.149l-1.371 1.371c-0.853 0.853-0.853 2.241 0 3.094 0.413 0.413 0.962 0.641 1.547 0.641s1.134-0.228 1.547-0.641l3-3c0.853-0.853 0.853-2.241 0-3.094-0.317-0.317-0.317-0.832 0-1.149s0.832-0.317 1.149 0c1.486 1.486 1.486 3.905 0 5.392l-3 3c-0.72 0.72-1.678 1.117-2.696 1.117z"></path>
                        </svg>
                     </div>
                  </a>
               );
            })
         }
         </div>
      </main>
   );
}

export default PlayoffBracket;