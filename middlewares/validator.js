const { check,validationResult } = require('express-validator')


exports.registerRules = () => [
    check('firstName', ' first name is required ').notEmpty(),
    check('lastName', ' last is required ').notEmpty(),
    check('email', ' email is required ').notEmpty(),
    check('email', ' should be a valid email ').isEmail(),
    check('address', ' address is required ').notEmpty(),
    check('password', ' password is required ').notEmpty(),
    check('password', ' password should be a 6 character minimum ').isLength({min:6})
]


const errorFormatter = ({ msg }) => {
    return `${msg }`}
exports.validator = (req, res, next)=>{
    const errors = validationResult(req).formatWith(errorFormatter)
    errors.isEmpty() ? next() : res.status(400).json({errors: errors.array() })
}
