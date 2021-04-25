const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("mongoUri");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log(`db is connected ...`);
  } catch (error) {
    console.log(error);
  }
  
};