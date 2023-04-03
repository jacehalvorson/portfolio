import React from "react";
import { getStatTable } from "../utils";
import "../style/NFLStats.css";

function NFLStats( )
{
   getStatTable( );

   return (
      <main id="nfl-stats">
         <div className="nfl-stats-container">
            <h1 className="nfl-stats-title">NFL Stats</h1>
            <p className="nfl-stats-description">
               A web application that allows users to view NFL player statistics.
            </p>
            <p className="nfl-stats-description">
               This project was created using React and the NFL Stats API.
            </p>
            <a href="https://nfl-stats-2020.herokuapp.com/">Link</a>
         </div>
      </main>
   );
}

export default NFLStats;