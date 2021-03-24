const Model = require('../model/Model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.POST = async (req, res) => {
    const { email, password } = req.body
    const validacion = await Model.findOne({email})
    try {
        if (validacion) {
            return res.status(400).send('Email en Uso')
        }
        const salt = await bcrypt.genSalt(10)
        const Encrypt = await bcrypt.hash(password, salt)
        
        const usuario = new Model({ ...req.body, password: Encrypt, createAt: Date.now() })
        await usuario.save()

        const payload = {
            usuario:{
                id: usuario._id
            }
        }
        jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600 }, (error, token) => {
            if (error) {throw error}
            res.send(token)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send('Error en Post de Usuario')
    }
}
exports.GET = async (req, res) => {
    try {
        const usuario = await Model.findById(req.usuario.id).select('-password -_id')
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo error en get de usuario')
    }
}