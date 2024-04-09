const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECT_STRING);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
    // return connect.connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
