const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGODB: `${process.env.MONGO_URI}`,
  // "mongodb://localhost:27017/food",
  SECRET_KEY: 'some very secret key'
};