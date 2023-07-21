const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
//this middleware is known as logger for development mode to dispay the request logger in console
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoutes");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
//connect with db
dbConnection();
//express app
const app = express();
// Middlewares
app.use(express.json());
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// //routes
// app.get('/',(req,res)=>{
// res.send('our API');
// });
//mount routes
app.use("/api/v1/categories", categoryRoute);
//handle invalid urls
app.all("*", (req, res, next) => {
  //create erroe and send it to error handling middleware
  // const err = new Error(`Can't find this Route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Can't find this Route: ${req.originalUrl}`, 400));
});

//global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, (req, res) => {
  console.log(`app running on port ${PORT}.`);
});

//handle rejections outside express
//events => listen => callback(err)
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection errors ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down ....`);
    process.exit(1);
  });
});
