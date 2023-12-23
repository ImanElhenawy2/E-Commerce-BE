const mongoose = require("mongoose");
const server = "127.0.0.1:27017";
const database = "E-Commerce-Website";

try {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => console.log("Connected to DB"));
  } catch (e) {
    console.log("Failed to connect to DB");
  }