const express = require('express');
const app = express();
const userRouter = require('./routes/user.js');

app.use(express.json())
app.use("/api/user", userRouter);
















const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then( () => {
    console.log('db connetcion successfull');
}).catch( (err) => {
        console.log(err);
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});