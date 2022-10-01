const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors=require('cors')
app.use(cors({
  origin:'http://localhost:3000',
  methods:["GET","POST"],
}))



//Router Import
const userRouter = require("./routes/user");
const orderhistoryRouter = require("./routes/orderhistory");
const productRouter = require("./routes/product");
const blogRouter=require('./routes/blog')

//Connect to DB
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB");
});

//Middleware
app.use(express.json());

//authRoute Middleware
app.use("/", userRouter);

//orderhistoryRoute Middleware
app.use("/", orderhistoryRouter);

//addProductRoute Middleware
app.use("/", productRouter);

//blogRoute Middleware
app.use("/",blogRouter);


//Listening to Port
app.listen(5000, () => {
  console.log("Server Started");
});
