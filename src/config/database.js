const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://hackerachal1620:Achal1620@learningnodejs-cluster1.jmy1lyk.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

