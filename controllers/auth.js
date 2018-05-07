'use strict'
const User = require('../models/user')
const mongoose = require('mongoose')
const service = require('../services')
function singUp(req,res){
    const user = new User({
        usernaname:req.body.username,
        email:req.body.email,
    })
    user.avatar = user.gravatar()
    user.save((err)=>{
        if (err) res.status(500).send({message:'error in signup',error:`${err}`})
        return res.status(200).send({token:service.createToken(user)})
    })
}
function logIn(req,res){
    User.find({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message:err})
        if(!user) return res.status(404).send({message:'user not found'})
        req.user=user
        res.status(200).send({message:'login successfully',token:service.createToken(user)})
    })
}
module.exports={
    logIn,
    singUp
}