'use strict';
const DynamoDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME || "notes"; // Set default as "notes" if env var is not present




const send = (statusCode, data) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
};

module.exports.createNote = async (event, context, cb) => {
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    };
    await documentClient.put(params).promise();
    cb(null, send(201, data));
  } catch (err) {
    cb(null, send(500, err.message));
  }
};

module.exports.updateNote = async (event, context, cb) => {
  let notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);

  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: { notesId },
      UpdateExpression: "set title = :titleVal, body = :bodyVal",
      ExpressionAttributeValues: {
        ":titleVal": data.title,
        ":bodyVal": data.body
      },
      ConditionExpression: "attribute_exists(notesId)",
      ReturnValues: "ALL_NEW"
    };

    const updatedItem = await documentClient.update(params).promise();
    // Send the updated data in the response
    return send(200, updatedItem.Attributes); // Return updatedItem.Attributes in the response
  } catch (err) {
    return send(500, err.message); // Send error response
  }
};




module.exports.deleteNote = async (event) => {
  let notesId = event.pathParameters.id;
  try {
    await documentClient.delete({
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId: notesId 
      }
    }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(`Node with ID ${notesId} has been deleted!`),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};


module.exports.getAllNotes = async (event) => {
  try {
    const notes = await documentClient.scan({ TableName: NOTES_TABLE_NAME }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(notes.Items), // Return the fetched notes
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};

