import {check} from 'express-validator'

//Adding Validation for duplicate Email && username
export const validateSignUp = [
    check("firstName")
    .notEmpty()
    .withMessage("FirstName Is Required")
    .isLength({max:20})
    .withMessage("Length Exceeded"),
    check("lastName")
    .notEmpty().withMessage("Length Exceeded Or Field Is Empty")
    .isLength({max:20}).withMessage("Length Exceeded"),
    check("password")
    .isLength({min:6})
    .withMessage('Password must be at least 6 character long'),
    check("email")
    .isEmail()
    .withMessage("Enter A Valid Email"),
    check("address")
    .notEmpty()
    .withMessage("Address Is Required"),
    check("state")
    .notEmpty()
    .withMessage("State Is Required")
]

export const validateSignIn = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

