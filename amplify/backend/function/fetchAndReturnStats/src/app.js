/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');
const cheerio = require('cheerio');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Helper functions *
 **********************/
async function getStatsAndReturnJson(url) {
  try {
    // Send GET request to the URL and get HTML in plaintext
    const response = await axios.get(url);

    if ( response.status !== 200 ) {
      throw new Error(`GET ${url} request failed`);
    }

    const text = response.data;

    // Parse the HTML to get stats table represented as strings
    const htmlObject = cheerio.load(text);

    // Selectors for the table headers and table rows
    const headSelector = '.stats_table > thead > tr:not(.over_header) > th';
    const bodySelector = '.stats_table > tbody > tr:not(.thead)';
    const aSelector = 'a';
    const tdSelector = 'td';

    // Grab innerHTML of the headers for the table
    const attributeList = [];
    htmlObject(headSelector).each((_, element) => {
      attributeList.push(htmlObject(element).html());
    });

    // Create a vector of players, each of which is a vector of their stats
    const statsMatrix = [];

    // Grab a list of <tr> tags
    const rows = htmlObject(bodySelector);

    // Iterate over the table rows and collect data from each
    rows.each((index, tr) => {
      // Create a vector of stats for this player
      const playerVector = [];
      // Player rank 1-n
      playerVector.push((index + 1).toString());

      // Iterate over the <td> elements
      htmlObject(tr).find(tdSelector).each((_, td) => {
      const a = htmlObject(td).find(aSelector);
      if (a.length > 0) {
        // Grab the innerHTML within the <a> tag
        playerVector.push(a.html());
      } else {
        // There are no <a> tags, so just grab the innerHTML of the td
        playerVector.push(htmlObject(td).html());
      }
      });

      // Add the player's data vector to the data matrix
      statsMatrix.push(playerVector);
    });

    const jsonData = {
      attributes: attributeList,
      players: statsMatrix,
    };

    // Return this JSON object
    return jsonData;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

/**********************
 * GET method *
 **********************/

app.get('/nflstats/:year/:category', async function(req, res) {
  getStatsAndReturnJson( `https://www.pro-football-reference.com/years/${req.params.year}//${req.params.category}.htm` )
    .then( ( data ) => {
      console.log( `getStatsAndReturnJson() returned ${data}` );
      res.json( data );
    })
    .catch( ( err ) => {
      console.log( `getStatsAndReturnJson() returned ${err}` );
      res.json({error: err, url: req.url});
    });
});

app.get('/nflstats/:year/:category/*', function(req, res) {
  res.json({error: 'Invalid parameters', url: req.url});
});


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
