'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/api/product/",(req,res)=>{
    Product.find({},(err,products)=>{
        if(err) return res.status(500).send({message:`error during products search:${err}`})
        if(!products) return res.status(404).send({message:`no products were found`})

        res.status(200).send({message:'products successfully found',products})
    })
})

app.get("/api/product/:productId",(req,res)=>{
    let productId= req.params.productId

    Product.findById(productId,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product search:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        res.status(200).send({message:'product successfully found',product})
    })
})

app.post("/api/product/",(req,res)=>{
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
})

app.delete("/api/product/:productId",(req,res)=>{
    let productId= req.params.productId

    Product.findById(productId,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product search:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        product.remove((err)=>{
        if(err) res.status(500).send({message:`error in saved product:${err}`})
        res.status(200).send({message:'product removed'})
        })
    })
})

app.put("/api/product/:productId",(req,res)=>{
    let productId= req.params.productId
    let update= req.body

    Product.findByIdAndUpdate(productId,update,(err,product)=>{
        if(err) return res.status(500).send({message:`error during product update:${err}`})
        if(!product) return res.status(404).send({message:`the product does not exist`})

        res.status(200).send({message:'product update'})    
    })
})

mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
    if(err) throw err
    console.log('Connected to MongoDB')
    app.listen(port,()=>{
        console.log(`API REST running in https://localhost:${port}`)
    })
})
