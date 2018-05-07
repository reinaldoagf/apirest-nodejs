'use strict'
const express = require("express")
const productController = require('../controllers/productController')
const api = express.Router()

//create product
api.post("/product/",productController.createProduct)
//get products
api.get("/product/",productController.getProducts)
//get product
api.get("/product/:productId",productController.getProduct)
//update product
api.put("/product/:productId",productController.updateProduct)
//delete product
api.delete("/product/:productId",productController.deleteProduct)

module.exports= api