const Model = require('../model/Model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

exports.POST = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({msg: errores.array()})
    }
    const { email, password } = req.body
    try {
        let usuario = await Model.findOne({email})
        if (!usuario) {
            return res.status(400).json({msg: 'usuario no exixte'})
        }
        const passCorrecta = await bcrypt.compare(password, usuario.password)
        if (!passCorrecta) {
            return res.status(400).json({msg: 'password no correcto'})
        }

        const payload = {
            usuario:{
                id: usuario._id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {expiresIn: 3600}, (error, token) => {
            if (error) {throw error}
            res.send(token)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send('Error en Post de Usuario')
    }
}