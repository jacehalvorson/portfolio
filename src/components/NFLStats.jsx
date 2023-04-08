import React, { useState, useEffect } from "react";
import "../style/NFLStats.css";
import "../style/index.css";

const api_url = '/api/2022/passing';

function NFLStats( )
{
   const [ tableHeader, setTableHeader ] = useState( <thead></thead> );
   const [ tableBody, setTableBody ] = useState( <tbody></tbody> );
   
   useEffect( ( ) => {
      // Send a GET request to the server to get the NFL stats table
      console.log( `Reading NFL stats from ${api_url}` );
      fetch( api_url )
         .then( response => response.json() )
         .then( json => {
            // Create the table from stats in JSON
            const attributeList = json.attributes;
            const playerList = json.players;
      
            // Create the table header
            setTableHeader( <thead><tr>{ attributeList.map( attribute => <th>{ attribute }</th> ) }</tr></thead> );
      
            // Create the table body
            setTableBody( <tbody>{ playerList.map( row => <tr>{ row.map( cell => <td>{ cell }</td> ) }</tr> ) }</tbody> );
         })
         .catch( err => console.error( 'Error parsing NFL stats from ' + api_url + '\n\n' + err ) );
   }, [ ] );

   return (
      <main id="nfl-stats">
         <div id="nfl-stats-selection-wrapper">
            <input type="number" class="nfl-stats-selection-item" id="nfl-stats-select-year"></input>
            <select class="nfl-stats-selection-item" id="nfl-stats-category">
               <option value="passing">Passing</option>
               <option value="rushing">Rushing</option>
               <option value="receiving">Receiving</option>
            </select>
            <button class="nfl-stats-selection-item" id="nfl-stats-load-button">Load</button>
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