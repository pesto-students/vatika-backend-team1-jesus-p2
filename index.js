const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser');
const cors=require('cors');
app.use(cors({
  origin:'http://localhost:3000',
  methods:["GET","POST","DELETE"],
}));


//Router Import's
const userRouter = require("./routes/user");
const orderhistoryRouter = require("./routes/orderhistory");
const productRouter = require("./routes/product"); 
const blogRouter=require('./routes/blog'); 
const addressRouter=require('./routes/address');
const superCoinRouter=require('./routes/supercoin');
const paymentRouter=require('./routes/payment')

//Connection to MongoDB
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB");
});


//Middleware
app.use(express.json());//this is to accept data in JSON Format
app.use(bodyParser.urlencoded({ extended: true }));//this is to decode the data sent from FrontEnd

app.use("/", userRouter); //authRoute Middleware
app.use("/", orderhistoryRouter); //orderhistoryRoute Middleware
app.use("/", productRouter); //addProductRoute Middleware
app.use("/",blogRouter); //blogRoute Middleware
app.use("/",addressRouter); //userAddressRoute Middleware
app.use("/",superCoinRouter); //supercoinRoute Middleware
app.use('/',paymentRouter); //paymentRoute Middleware

//Listening to Port
app.listen(5000, () => {
  console.log("Server Started");
});
