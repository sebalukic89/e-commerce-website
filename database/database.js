const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

// establish connection to the database
async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://localhost:27017');

  // assign the name of the database to the variable
  database = client.db('online-shop');
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
