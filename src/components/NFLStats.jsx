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
         .catch( err => console.error( 'Error parsing NFL stats from ' + api_url + '\n' + err ) );
   }, [ ] );

   return (
      <main id="nfl-stats">
         <table>
            <caption>Passing Table</caption>
            { tableHeader }
            { tableBody }
         </table>
      </main>
   );
}

export default NFLStats;