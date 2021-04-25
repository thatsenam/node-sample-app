const { ObjectID } = require("mongodb");
const { User, Survey } = require("../models/DeliveryBoy");
const { surveyConfirmation } = require("./emailSercives");

module.exports = surveyController = {
  answerSurvey: async (req, res) => {
    const userId = ObjectID(req.params.userId);
    const answers = req.body.survey
    const email = req.body.email
      try {
            User.findByIdAndUpdate(
              userId,
              { $push: { surveys: answers }, surveyComplete:true },
              { new: true },
              (err, data) => {
                if (err) res.status(504).json({ errors: error });
                else {
                  surveyConfirmation(email)
                  res.status(200).json("survey add with success");
                }
              }
            )
      } catch (error) {
        res.status(500).json({ errors: error });
      }
  },
};
