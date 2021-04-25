const express = require("express");
const connectDB = require("./config/connectDB");

const deliveryBoy = require('./routes/deliveryBoy')
const survey = require('./routes/survey')
const app = express();

app.use('/uploads', express.static('uploads'))

app.use(express.json());

connectDB();

app.use('/', deliveryBoy,  survey)



const port = process.env.PORT || 5000;

app.listen(port, err =>
  err
    ? console.err("server is not running")
    : console.log(`server is running on port : ${port}`)
);