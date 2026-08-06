import {body , validationResult} from "express-validator";

const validateProduct = async (req,res , next)=>{

    const rules = [
        body("name").notEmpty().withMessage("Name is invalid") ,
        body("price").isFloat({gt:0}).withMessage("Price is invalid") ,
        //body("imageUrl").isURL().withMessage("Url is invalid")

       body('imageUrl').custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image is needed!");
        }
        return true;
})
    ]

    await Promise.all( rules.map((rule) =>rule.run(req)) );

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.render("new-product" , {errorMessage : validationErrors.array()[0].msg});
    }

    next();


}
export default validateProduct;































// const validateProduct = (req,res , next)=>{
//     const{name , price , imageUrl} = req.body;
//     errors = []

//     if(!name || name.trim() == ""){
//         errors.push("Name is invalid");
//     }

//     if(!price || parseFloat(price)<1){
//         errors.push("Price is invalid");

//     }

//     try{
//         const vlaidUrl = new URL(imageUrl);

//     }catch(err){
//         errors.push("Url is invalid");
//     }

//     if(errors.length>0){
//         return res.render("new-product" , {errorMessage : errors[0]})
//     }

//     next();
// }

// export default validateProduct;