const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');   

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

app.use("/", express.static("build"));

server.applyMiddleware({
  app,
  path: '/'
});

app.listen(PORT, () => {
  connectDB()
  console.log(`app listening on port ${PORT}`);
});
