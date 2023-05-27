import {validationResult} from 'express-validator'
export const isValid = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err : errors.array()[0].msg});
    }
    next();
}