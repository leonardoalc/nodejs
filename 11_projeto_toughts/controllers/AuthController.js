const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class AuthController {

    static login(req, res) {
        res.render("auth/login")
    }

    static async loginPost(req, res) {
        const {email, password} = req.body

        // encontrando usuário
        const user = await User.findOne({where: {email:email}})

        if(!user){
            req.flash("message", "Usuário não encontrado.")
            res.render("auth/login")

            return
        }

        // checando se a senha está correta
        const passwordCheck = bcrypt.compareSync(password, user.password)

        if (!passwordCheck) {
            req.flash("message", "Dados de login incorretos.")
            res.render("auth/login")

            return
        }

        // inicializando a seção
        req.session.userId = user.id

        req.flash("message", "Usuário logado com sucesso")

        req.session.save(() => {
            res.redirect("/")
        })

    }

    static register(req, res) {
        res.render("auth/register")
    }

    static async registerPost(req, res) {
        const {name,email, password, confirmPassword} = req.body

        // verificando se as senhas são iguais
        if (password !== confirmPassword) {
            req.flash("message", "As senhas não são iguais, tente novamente.")
            res.render("auth/register")

            return
        }

        // checando se o email já está em uso
        const checarEmail = await User.findOne({where: {email: email}})

        if (checarEmail) {
            req.flash("message", "O email já está em uso.")
            res.render("auth/register")

            return
        }

        // gerando senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            // inicializando a seção
            req.session.userId = createdUser.id

            req.flash("message", "Usuário cadastrado com sucesso.")

            req.session.save(() => {
                res.redirect("/")
            })
        } catch (error) {
            console.log(error)
        }
    
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect("/login")
    }
}