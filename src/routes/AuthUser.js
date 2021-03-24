const express = require('express')
const routes = express.Router()
const AuthUser = require('../collections/AuthUser')

routes.post('/', AuthUser.POST)

module.exports = routes;