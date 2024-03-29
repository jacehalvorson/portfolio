/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_NFLSTATS_ARN
	STORAGE_NFLSTATS_NAME
	STORAGE_NFLSTATS_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

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
 * GET method *
 **********************/
app.get('/nflstats/:year/:category', function(req, res) {
  dynamodb.get({
    TableName: process.env.STORAGE_NFLSTATS_NAME,
    Key: {
      // The primary key of the table is the year and category concatenated (ex. '2017receiving' )
      id: ( req.params.year + req.params.category )
    }
  }).promise()
    .then( ( data ) => {
      res.json( data.Item );
    })
    .catch( ( err ) => {
      res.json( { error: err, url: req.url } );
    });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
