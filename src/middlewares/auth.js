const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(400).json({msg: 'No hay Token'})
    }
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = cifrado.usuario;
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send('error en middlewares')
    }
}