const mongoose = require("mongoose");

const dbString =
 "";
mongoose.connect(dbString)

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connection Succesfull");
});

connection.on("error", () => {
  console.log("Connection Unsuccesfull");
});
