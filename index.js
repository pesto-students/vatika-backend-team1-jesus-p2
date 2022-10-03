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


//Router Import
const userRouter = require("./routes/user");
const orderhistoryRouter = require("./routes/orderhistory");
const productRouter = require("./routes/product");
const blogRouter=require('./routes/blog');
const addressRouter=require('./routes/address');
const superCoinRouter=require('./routes/supercoin');
const paymentRouter=require('./routes/payment')

//Connect to DB
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB");
});


//Middleware
app.use(express.json());//this is to accept data in JSON Format
app.use(bodyParser.urlencoded({ extended: true }));//this is to Decode the data sent from FrontEnd

//authRoute Middleware
app.use("/", userRouter);

//orderhistoryRoute Middleware
app.use("/", orderhistoryRouter);

//addProductRoute Middleware
app.use("/", productRouter);

//blogRoute Middleware
app.use("/",blogRouter);

//userAddressRoute Middleware
app.use("/",addressRouter);

//supercoinRoute Middleware
app.use("/",superCoinRouter);

//paymentRoute Middleware
app.use('/',paymentRouter);

//Listening to Port
app.listen(5000, () => {
  console.log("Server Started");
});
