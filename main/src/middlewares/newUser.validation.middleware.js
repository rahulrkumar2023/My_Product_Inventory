import {body , validationResult} from "express-validator";

const validateUser = async (req,res , next)=>{

    const rules = [
        body("name").notEmpty().withMessage("Name is invalid") ,

        body("email").isEmail().withMessage("Email is invalid!") ,
        
        body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character')



    ]

    await Promise.all( rules.map((rule) =>rule.run(req)) );

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.render("/login" , {errorMessage : validationErrors.array()[0].msg});
    }

    next();


}
export default validateUser;

































