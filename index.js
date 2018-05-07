'use strict'

const mongoose = require('mongoose')

const app = require('./app')
const config = require('./config')
mongoose.connect(config.db,(err,res)=>{
    if(err) throw err
    console.log('Connected to MongoDB')
    app.listen(config.port,()=>{
        console.log(`API REST running in https://localhost:${config.port}`)
    })
})
