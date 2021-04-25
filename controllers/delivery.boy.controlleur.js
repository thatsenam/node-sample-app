const config = require("config");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");
const { User, Photo } = require("../models/DeliveryBoy");
const {sendEmailConfirmation} = require('./emailSercives')

const secretOrKey = config.get("secretOrKey");
module.exports = userController = {
  register: async (req, res) => {
    const { firstName, lastName, email, address, password } = req.body;
    const emailToken = crypto.randomBytes(16).toString('hex')
    try {
      const searchResultRegister = await User.findOne({ email });
      if (searchResultRegister)
        return res
          .status(400)
          .json({ errors: "user already exist ! try another email adress" });
      const newUser = new User({
        firstName,
        lastName,  
        email,
        emailToken,
        address,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          try {
            newUser.password = hash;
            const addResult = await newUser.save();
            sendEmailConfirmation(email, emailToken)
            res.status(200).json(addResult);
          } catch (error) {
            res.status(500).json({ errors: error });
          }
        });
      });
         } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
  emailValidation: async (req, res)=> {
    const emailToken = req.params.emailToken;
    try {
      const searchToken = await User.findOne({emailToken});
      
      searchToken.isVerified = true;
      searchToken.emailToken = null;
      const addResult = await searchToken.save()
      res.status(200).json(addResult)
      
    } catch (err) {
      res.status(500).json({error: err})
    }
    
},


  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResultLogin = await User.findOne({ email });
      if (!searchResultLogin)
        return res.status(400).json({ errors: "user not exist" });
      const isMatch = await bcrypt.compare(
        password,
        searchResultLogin.password
      );
      if (!isMatch)
        return res.status(400).json({ errors: "password is not correct" });
      const payload = {
        isVerified: searchResultLogin.isVerified,
        id: searchResultLogin._id,
        firstName: searchResultLogin.firstName,
        lastName: searchResultLogin.lastName,
        email: searchResultLogin.email,
        adress: searchResultLogin.adress,
      };
      jwt.sign(payload, secretOrKey, (err, token) => {
        if (err) throw err;
        res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
 
  };
