const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGODB: `mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@cluster0.hj5g1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  // "mongodb://localhost:27017/food",
  SECRET_KEY: 'some very secret key'
};