import React, { useState, useEffect } from "react";
import "./playoff_bracket.css";
import "../index.css";

const HOME = 0;
const AWAY = 1;

function PlayoffBracket( )
{
   // const [ tableHeader, setTableHeader ] = useState( <caption>Loading...</caption> );
   // const [ tableBody, setTableBody ] = useState( <tbody></tbody> );
   
   useEffect( ( ) => {
      // TODOs
   }, [ ] );

   const players = [
      {
         name: "Player 1",
         score: 100,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 2",
         score: 99,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 3",
         score: 98,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 4",
         score: 97,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 5",
         score: 96,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 6",
         score: 95,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 7",
         score: 94,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 8",
         score: 93,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 9",
         score: 92,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 10",
         score: 91,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 11",
         score: 90,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 12",
         score: 89,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 13",
         score: 88,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 14",
         score: 87,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 15",
         score: 86,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 16",
         score: 85,
         bracketLink: "https://www.google.com"
      },
      {
         name: "Player 17",
         score: 84,
         bracketLink: "https://www.google.com"
      },
   ];

   return (
      <main id="playoff-bracket">
         <h1 class="title">2024 Playoff Bracket Leaderboard</h1>
         
         <div class="leaderboard">
         {
            players.map( ( player ) => {
               return (
                  <div class="player">
                     <h2>{ player.name }</h2>
                     <h3>{ player.score }</h3>
                     <a href={ player.bracketLink}>See bracket</a>
                  </div>
               );
            })
         }
         </div>
      </main>
   );
}

export default PlayoffBracket;