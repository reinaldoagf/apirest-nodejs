'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrytp = require('bcrypt-nodejs')
const crytpo = require('crypto')
const UserSchema = Schema({
    usernaname:{
        type:String,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:{
        type:Number,
        select:false
    },
    signupDate:{
        type: Date,
        default: Date.now()
    },
    lastLogin:{
        type:Date
    },
    avatar:{
        type:String,
    }
})
UserSchema.pre('save',(next)=>{
    let user = this
    if(!user.isModified('password')) return next()

    bcrytp.genSalt(10,(err,salt)=>{
        if (err) return next(err)
        bcrytp.hash(user.password,salt,null,(err,hash)=>{
            if(err) return next(err)
            user.password=hash
            next()
        })
    })
})
UserSchema.methods.gravatar= function(){
    if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
module.exports=mongoose.model('User',userSchema)