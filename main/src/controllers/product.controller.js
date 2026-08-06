import path from "path";
import ProdutModel from "../models/product.model";

export default class ProductController{
    getProducts(req,res){
        let products = ProdutModel.get();
        console.log(products);
        res.render("index" , {products:products , userEmail = req.session.userEmail})
        //return res.sendFile(path.join(path.resolve() , "src" , "views" , "products.html"));
    }

    getAddForm(req,res){
        return res.render("new-product");
    }

    addNewProduct(req,res){
        const {name  , desc , price} = req.body;
        const imageUrl = "images"+req.file.filename;
        ProdutModel.add(name , desc , price , imageUrl)
        
        let products = ProdutModel.get();
        return res.render("index" , {products , userEmail = req.session.userEmail});
    }

    getUpdateProduct(req, res , next){
        const id = req.params.id;
        const productFound = ProdutModel.getById(id)

        if(productFound){
            res.render("update-product" , {product : productFound , errorMessage : null})

        }
        else{
            res.status(401).send("Product not Found!");
        }
    }

    postUpdateProduct(req , res){
        ProdutModel.update(req.body);
        let products = ProdutModel.get();
        res.render("index" , {products , userEmail = req.session.userEmail });
    }

    deleteProduct(req , res){
        const id = req.params.id;
        const productFound = ProdutModel.getById(id)

        if(!productFound){
            return res.status(401).send("Product not found!")
        }

        ProdutModel.deleteProduct(id);
        let products = ProdutModel.get();
        res.render("index" , {products , userEmail = req.session.userEmail });
    }
}