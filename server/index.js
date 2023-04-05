const express = require('express');
const path = require('path');

async function getStatTable( ) {
   try
   {
      const url = 'https://www.pro-football-reference.com/years/2022/passing.htm';
      const response = await fetch( url );
      const html = await response.text( );
      
      const parser = new DOMParser( );
      const parsedHtml = parser.parseFromString( html, 'text/html' );
     const table = parsedHtml.querySelector( 'table' );
     console.log( table );
     return table;
   }
   catch ( error )
   {
      console.error( 'Error: Could not get stat table - ' + error );
   }
}

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/api/stat-table', (req, res) => {
   res.setHeader('Content-Type', 'text/html');
   res.sendFile(path.resolve(__dirname, 'stats_table.html'));
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});

// const path = require('path');
// const fs = require('fs');

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import App from '../src/App';
// import NFLStats from '../src/components/NFLStats';
// import getStatTable from '../src/utils';

// const PORT = process.env.PORT || 3006;

// const express = require('express');
// const app = express();

// app.get('/stat-table', (req, res) => {
//    const NFLStatsComponent = ReactDOMServer.renderToString(<NFLStats />);
//    console.log("stat-table");
//    // const statTable = getStatTable();
//    res.send(
//       '<h1>Hello World</h1>'
//    );
// });

// app.get('*', (req, res) => {
//    const reactApp = ReactDOMServer.renderToString(<App />);
//    console.log("stat-table");
   
//    const indexFile = path.resolve('../public/index.html');
//    fs.readFile(indexFile, 'utf8', (err, data) => {
//       if (err) {
//          console.error('Something went wrong:', err);
//          return res.status(500).send('Oops, better luck next time!');
//       }
   
//       return res.send(
//          data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
//       );
//    });
// });

// app.use(express.static(path.resolve(__dirname, '..', 'public')));

// app.listen(PORT, () => {
//    console.log(`Server is listening on port ${PORT}`);
// });