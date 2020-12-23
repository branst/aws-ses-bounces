'use strict';
var request = require('request');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const tableName = process.env.tableName;
const ddb = new AWS.DynamoDB.DocumentClient();


module.exports.entry = async (event) => {

   
    var msg = JSON.parse(event.Records[0].body)
    var detail = JSON.parse(msg.Message)
    
    var params = {
        TableName: tableName,
        Item: {
          'id' : uuidv4(),
          'email' : detail.bounce.bouncedRecipients[0].emailAddress,
          'date': msg.Timestamp,
          'type': detail.notificationType,
          'reason': detail.bounce.bounceSubType
        }
      };

    const result = await ddb.put(params).promise()
    console.log(result)   

  return {
  statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Ok',
        input: event,
      },
      null,
      2
    ),
  };
};
