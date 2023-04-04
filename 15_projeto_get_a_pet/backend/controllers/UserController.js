const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")

module.exports = class UserController {
    static async register(req, res) {
        
        const {name, email, phone, password, confirmpassword} = req.body

        // validações 
        if(!name) {
            return res.status(422).json({message: "O nome é obrigatório."})
        }
        if(!email) {
            return res.status(422).json({message: "O email é obrigatório."})
        }
        if(!phone) {
            return res.status(422).json({message: "O telefone é obrigatório."})
        }
        if(!password) {
            return res.status(422).json({message: "A senha é obrigatória."})
        }
        if(!confirmpassword) {
            return res.status(422).json({message: "Confirme sua senha."})
        }
        if(password !== confirmpassword) {
            return res.status(422).json({message: "As senhas precisam ser iguais."})
        }

        // Validando se o usuário já está cadastrado
        const userExist = await User.findOne({email: email})
        if(userExist) {
            return res.status(422).json({message: "Email já cadastrado."})
        }

        // criando senha criptografada
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // criando usuário
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})
        }


    }

    static async login(req, res) {
        
        const {email, password} = req.body

        // validações
        if(!email) {
            return res.status(422).json({message: "O email é obrigatório."})
        }
        if(!password) {
            return res.status(422).json({message: "A senha é obrigatória."})
        }
        // Validando se o usuário já está cadastrado
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(422).json({message: "Email incorreto. "})
        }

        // validando se a senha confere
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            return res.status(422).json({message: "Senha incorreta."})
        }

        // deixei especificado qual item está incorreto para fins de estudo, acredito que o ideal
        // seria uma mensagem mais abstrata. "Email e/ou senha incorretos", algo do tipo.

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {

        let currentUser 

        if(req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, "secretteste")

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
}