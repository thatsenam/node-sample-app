const express = require('express')

const surveyControlleur = require('../controllers/survey.controlleur')
const Router = express.Router()


//delivery action for survey
Router.post('/profile/:userId', surveyControlleur.answerSurvey)

module.exports = Router