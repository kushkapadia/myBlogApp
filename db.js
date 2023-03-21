const { MongoClient } = require('mongodb')

const client = new MongoClient("mongodb+srv://todoAppUser:<yourPassword>@cluster0.6lvjr.mongodb.net/blogApp?retryWrites=true&w=majority")


//A function to connect to the database
async function start() {
  await client.connect()
  console.log("Connected")
  //Export the connection
  module.exports = client.db()
  const app = require('./app')
  app.listen(4000)
}


start()