import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../style/NFLStats.css";
import "../style/index.css";

const apiName = "apinflstats";

const categories = [
   { "name": "Passing", "value": "passing" },
   { "name": "Rushing", "value": "rushing" },
   { "name": "Receiving", "value": "receiving" },
   { "name": "Scrimmage Stats", "value": "scrimmage" },
   { "name": "Defense", "value": "defense" },
   { "name": "Kicking", "value": "kicking" },
   { "name": "Punting", "value": "punting" },
   { "name": "Kick & Punt Returns", "value": "returns" },
   { "name": "Scoring", "value": "scoring" }
]

const teamMap = {
   "NWE": "NE",
   "GNB": "GB"
};

function fetchStatsAndSetTable( year, category, tableHeaderSetter, tableBodySetter )
{
   API.get( apiName, `/nflstats/${year}/${category}` )
      .then( json => {
         // Create the table from stats in JSON
         const attributeList = json.attributes;
         const playerList = json.players;
   
         // Create the table header
         tableHeaderSetter( <thead><tr>{ attributeList.map( attribute => <th>{ attribute }</th> ) }</tr></thead> );
   
         // Create the table body
         tableBodySetter( <tbody>{ playerList.map( row => <tr>{ row.map( cell => <td>{ cell }</td> ) }</tr> ) }</tbody> );
      })
   .catch( err => {
      console.error( 'Error parsing NFL stats from ' + apiName + '\n\n' + err );
      tableHeaderSetter( <thead>Error loading stats</thead> );
      tableBodySetter( <tbody></tbody> );
   });
}

function NFLStats( )
{
   const [ tableHeader, setTableHeader ] = useState( <thead>Loading...</thead> );
   const [ tableBody, setTableBody ] = useState( <tbody></tbody> );
   
   useEffect( ( ) => {
      // Send a GET request to the server to get the NFL stats table
      console.log( `Reading NFL stats from ${apiName}` );
      fetchStatsAndSetTable( 2022, categories[ 0 ].value, setTableHeader, setTableBody );
   }, [ ] );

   return (
      <main id="nfl-stats">
         <div id="nfl-stats-selection-wrapper">
            <input type="number" className="nfl-stats-selection-item" id="nfl-stats-select-year"></input>
            <select className="nfl-stats-selection-item" id="nfl-stats-category">
               { categories.map( category => <option value={ category.value }>{ category.name }</option> ) }
            </select>
            <button
               className="nfl-stats-selection-item"
               id="nfl-stats-load-button"
               onClick={ ( ) => {
                  const year = document.getElementById( "nfl-stats-select-year" ).value;
                  const category = document.getElementById( "nfl-stats-category" ).value;
                  setTableHeader( <thead>Loading...</thead> );
                  setTableBody( <tbody></tbody> );
                  fetchStatsAndSetTable( year, category, setTableHeader, setTableBody );
               }}
            >Load</button>
         </div>
         <table>
            { tableHeader }
            { tableBody }
         </table>
         <div id="nfl-stats-background-picture"></div>
      </main>
   );
}

export default NFLStats;