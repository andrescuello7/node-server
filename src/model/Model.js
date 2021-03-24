const mongoose = require('mongoose')

const usuario = mongoose.Schema({
    name:{
        type: String,
        default: true,
        tim: true
    },
    email:{
        type: String,
        default: true,
        tim: true,
        unique: true
    },
    password:{
        type: String,
        default: true,
        tim: true
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('usuario', usuario)