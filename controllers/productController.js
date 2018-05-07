'use strict'
const Product = require('../models/product')
function createProduct(req,res){
    let newProduct= new Product()
    newProduct.name=req.body.name,
    newProduct.picture=req.body.picture,
    newProduct.price=req.body.price,
    newProduct.category=req.body.category,
    newProduct.description=req.body.description,
    
    newProduct.save((err,productStored)=>{
        if(err) res.status(500).send({message:`error in saved product:${err}`})
        res.status(200).send({message:'product created',product:productStored})
    })
}
function getProducts(req,res){
    Product.find({},(err,products)=>{
        if(err) return res.status(500).send({message:`error during products search:${err}`})
        if(!products) return res.status(404).send({message:`no products were found`})

        res.status(200).send({message:'products successfully found',products})
    })
}
function getProduct(req,res){
    let productId= req.params.productId

    Product.findById(productId,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product search:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        res.status(200).send({message:'product successfully found',product})
    })
}
function updateProduct(req,res){
    let productId= req.params.productId
    let update= req.body

    Product.findByIdAndUpdate(productId,update,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product update:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        res.status(200).send({message:'product update'})    
    })
}
function deleteProduct(req,res){
    let productId= req.params.productId

    Product.findById(productId,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product search:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        product.remove((err)=>{
        if(err) res.status(500).send({message:`error in saved product:${err}`})
        res.status(200).send({message:'product removed'})
        })
    })
}

module.exports ={
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}