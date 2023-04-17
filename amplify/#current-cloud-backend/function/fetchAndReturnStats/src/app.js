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
const execFile = require('child_process').execFile;

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
// Spawn child process to update JSON file, don't return until it's done
async function spawnChildProcess( fileName, year, category ) {
  const startTime = process.hrtime.bigint();
  console.log( `spawnChildProcess() started` );

  const result = await new Promise( ( resolve, reject ) => {
     execFile( fileName, [ year, category ], function(err, data) {
        if ( err ) {
           reject( err );
        }
        else {
           console.log( `nflstatsrequest.exe completed with return ${data.toString()}` );
           resolve( data );
        }
     });
  });

  const elapsedTime = process.hrtime.bigint() - startTime;
  console.log( `spawnChildProcess() finished in ${elapsedTime} microseconds` );
  return result;
}


/**********************
 * Example get method *
 **********************/

app.get('/nflstats/:year/:category', async function(req, res) {
  // Spawn child process and wait for execution to finish
  await spawnChildProcess( 'request.exe', req.params.year, req.params.category );

  // Now that JSON is updated, send it to the client
  res.sendFile(path.resolve(__dirname, 'stats_table.json'));
});

app.get('/nflstats/:year/:category/*', function(req, res) {
  res.json({error: 'Invalid parameters', url: req.url});
});


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
