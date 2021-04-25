const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  status: String,
  isVerified: { type: Boolean, default: false },
  email: String,
  emailToken: String,
  address: String,
  password: String,
  surveyComplete: { type: Boolean, default: false },
  photosComplete: { type: Boolean, default: false },
  resumeComplete: { type: Boolean, default: false },
  date: {type: Date,
    default: Date.now},
  resume:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "resume",
    autopopulate: true,
  } ,
  surveys: [],
  
});

const surveySchema = new mongoose.Schema({
  question: String,
  questionResponces: [{type: String}],
  answerType: String,
  date: {type: Date,
    default: Date.now},
});



const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {type: String, trim: true, require: true},
  path: {type: String, trim: true, require: true},
  date: {type: Date,
    default: Date.now},
});
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {type: String, trim: true, require: true},
  path: {type: String, trim: true, require: true},
  date: {type: Date,
    default: Date.now},
});


User = mongoose.model("user", userSchema);
Survey = mongoose.model("survey", surveySchema);
Photo = mongoose.model("photo", photoSchema);
Resume = mongoose.model("resume", resumeSchema);


module.exports = {
  User, Survey,  Photo, Resume
};
