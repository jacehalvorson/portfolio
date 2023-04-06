import React, {useState} from "react";
import "../style/NFLStats.css";
import "../style/index.css";
import { useEffect } from "react";

function NFLStats( )
{
   const [ table, setTable ] = useState( '' );
   
   useEffect( ( ) => {
      // Send a GET request to the server to get the NFL stats table
      console.log( 'Reading NFL stats from /api/stat-table' );
      fetch( '/api/stat-table' )
         .then( response => response.text() )
         .then( text => setTable( text ) );
   }, [ ] );

   return (
      <main id="nfl-stats">
         <div dangerouslySetInnerHTML={{__html: table }}>

         </div>
      </main>
   );
}

export default NFLStats;