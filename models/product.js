'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name:{
        type:String,
    },
    picture:{
        type:String,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
        enum:['computers','phones','accesories']
    },
    description:{
        type:String,
    }
})

module.exports=mongoose.model('Product',ProductSchema)