const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGO_DB_URI;
const mongoOptions = {
  useNewUrlParser: true,
};

module.exports = function () {
  try {
    mongoose.connect(mongoURI, mongoOptions);
    console.log("Connected to MongoDb!")
  } catch (err) {
    console.error(
      `Connection error: ${err.stack} on Worker process: ${process.pid}`
    );
    process.exit(1);
  }
};
