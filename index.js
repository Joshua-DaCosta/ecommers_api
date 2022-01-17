const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then( () => {
    console.log('db connetcion successfull');
}).catch( (err) => {
        console.log(err);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port 5000");
});