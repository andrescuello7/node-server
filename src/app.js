const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const cors = require("cors");

//Declaracions
const app = express()
app.use(cors());

//Connection
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qa9gg.mongodb.net/usuario?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//Settings
app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json({ extended: true }))
app.use(express.urlencoded())

//Routes
const Index = require('../src/routes/RouteUser')
app.use('/api/usuarios', Index)
const Auth = require('../src/routes/AuthUser')
app.use('/api/auth', Auth)

//Server
app.listen(app.get('port'), () => {
    console.log('server in funcionament in port', app.get('port'))
})