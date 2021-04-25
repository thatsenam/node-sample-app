const express = require('express')

const deliveryBoyControlleur = require('../controllers/delivery.boy.controlleur')
const uploadControlleur = require('../controllers/upload.controlleur')
const {registerRules, validator } = require('../middlewares/validator')
const resumeValidation = require('../middlewares/resumeValidator')
const multerUploadPhotos = require('../middlewares/photosUpload')
const multerUploadResume = require('../middlewares/resumeUpload')
const isAuth = require('../middlewares/passport-setup')
const Router = express.Router()

Router.post('/register', registerRules(), validator, deliveryBoyControlleur.register)
Router.post('/login', deliveryBoyControlleur.login)
Router.get('/profile', isAuth(), (req, res)=> res.json(req.user))
Router.post('/uploadPhotos/:id',multerUploadPhotos,  uploadControlleur.uploadImage)
Router.post('/uploadResume/:id',multerUploadResume, resumeValidation, uploadControlleur.uploadResume )
Router.get('/confirmation/:emailToken',deliveryBoyControlleur.emailValidation)





module.exports = Router