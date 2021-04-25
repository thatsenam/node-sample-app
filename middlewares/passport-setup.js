const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('config')
const passport = require('passport')

const {DeliveryBoy} = require('../models/DeliveryBoy')
const secretOrKey = config.get('secretOrKey')

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
}

passport.initialize()

passport.use(
    new JwtStrategy(opts, async(jwt_payload, done)=>{
        try {
            const searchResult = await DeliveryBoy.findById(jwt_payload.id).select('-password')
            searchResult ? done(null, searchResult) : done(null, false)
        } catch (error) {
            console.error(error)           
        }
    })
)

module.exports = isAuth = ()=> passport.authenticate('jwt', {session:false})