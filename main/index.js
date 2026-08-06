import express, { urlencoded } from "express";
import path from "path"
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";

import ProductController from "./src/contollers/product.controller.js";
import UserController from "./src/contollers/user.controller.js";
import validateProduct from "./src/middlewares/newProductValidation.middleware.js";
import validateUser from "./src/middlewares/newUser.validation.middleware.js";
import { uploadFile } from "./src/middlewares/imageUpload.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";



const server = express();

server.use(
    session({
        secret :"Secret-Key",
        resave :false,
        saveUninitialized : false,
        cookie : {secure : false}
    })
);

server.use(urlencoded({extended : true}));

server.set("view engine" , "ejs");
server.set("views" , path.join( path.resolve() , "src" , "views" ));

const productController = new ProductController();
const userController = new UserController();
server.use(express.static("src/views"));
server.use(expressEjsLayouts);


server.get("/register" , (req,res)=> userController.getRegister(req, res));
server.post("/register" , (req,res) =>userController.postRegister(req, res));
server.get("/login" , (req,res)=> userController.getLogin(req , res));
server.post("/login" , (req , res)=> userController.postLogin(req , res));



server.get("/new" ,auth ,  productController.getAddForm);
server.get("/" , auth , (req , res)=>productController.getProducts(req , res));
server.post("/" , auth , uploadFile.single('imageUrl'),validateProduct , productController.addNewProduct);



//update Product
server.get("/update-product/:id" ,auth ,  (req,res) =>{ productController.getUpdateProduct(req,res)});
server.post("/update-product" , auth , (req,res) => productController.postUpdateProduct(req,res))

//delete product
server.delete("delete-product/:id" ,auth ,  (req,res)=>productController.deleteProduct(req, res));

server.listen(8080 , ()=>{
    console.log("Server running on port 8080");
});

