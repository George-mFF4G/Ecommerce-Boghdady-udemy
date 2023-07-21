const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database connection: ${conn.connection.host}`);
  });
  // .catch((err)=>{
  // console.error(`datbase error ${err}`);
  // process.exit(1);
  // });
};
module.exports = dbConnection;
