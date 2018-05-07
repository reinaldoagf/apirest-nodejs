'use strict'
const User = require('../models/user')
const mongoose = require('mongoose')
const service = require('../services')
function singUp(req,res){
    const user = new User({
        usernaname:req.body.username,
        email:req.body.email,
    })
    user.save((err)=>{
        if (err) res.status(500).send({message:`error in signup:${err}`})
        return res.status(200).send({token:service.createToken(user)})
    })
}
function singIn(req,res){
    
}
module.exports={
    singIn,
    singUp
}