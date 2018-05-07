'use strict'
const express = require("express")
const productController = require('../controllers/productController')
const userController = require('../controllers/auth')
const auth = require('../middlewares/auth')
const api = express.Router()
//user signup
api.post("/signup/",userController.singUp)
//user login
api.post("/login/",userController.logIn)
//create product
api.post("/product/",productController.createProduct)
//get products
api.get("/product/",auth,productController.getProducts)
//get product
api.get("/product/:productId",productController.getProduct)
//update product
api.put("/product/:productId",productController.updateProduct)
//delete product
api.delete("/product/:productId",productController.deleteProduct)
//test middleware
api.get("/private/",auth,function(req,res){
    res.status(200).send({message:'accessed successfully'})
})

module.exports= api