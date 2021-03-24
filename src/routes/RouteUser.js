const express = require('express')
const routes = express.Router()
const usuario = require('../collections/CollectionUser')
const auth = require('../middlewares/auth')

routes.get('/', auth, usuario.GET)
routes.post('/', usuario.POST)

module.exports = routes;