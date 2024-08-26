const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, console.log("mongo connecter"));
  } catch (err) {
    console.log(`l'erreur est ${err}`);
    process.exit();
  }
};

module.exports = connectDB;
