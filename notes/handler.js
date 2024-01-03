'use strict';

module.exports.createNote = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("A new Node created!"),
  };
};

module.exports.updateNote = async (event) => {
  let notesId = event.pathParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify(`Node with ID ${notesId} updated!`),
  };
};

module.exports.deleteNote = async (event) => {
  let notesId = event.pathParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify(`Node with ID ${notesId} has been deleted!`),
  };
};

module.exports.getAllNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(`All Notes are returned!`),
  };
};
