const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.6t6qi.mongodb.net/WeebCord?retryWrites=true&w=majority`,
  () => {
    console.log("Connected to mongodb");
  }
);
