const flash = require("express-flash")
const Tought = require("../models/Tought")
const User = require("../models/User")

const { Op } = require("sequelize")

module.exports = class ToughtController {
    static async showAll(req, res) {

        let search = ""

        if (req.query.search) {
            search = req.query.search
        }

        let order = "DESC"

        if(req.query.order === "old") {
            order = "ASC"
        } else {
            order = "DESC"
        }


        // incluindo o usuário e limpando dados
        // caso o search seja true, o where será preenchido pelo Oplike/search dinamicamente.
        // caso não haja search, where será uma string vazia, oq resultará na pesquisa de todos os itens.
        const toughts = await Tought.findAll({
            // opções de busca
            include: User, 
            where: {title: {[Op.like]: `%${search}%`}}, 
            order: [["createdAt", order]],
            // opções limpando as informações
            raw: true, 
            nest: true}) 

        let toughtsQty = toughts.length

        if (toughtsQty === 0) {
            toughtsQty = false
        }


        res.render("toughts/home", { toughts, toughtsQty, search })
    }

    static async dashboard(req, res) {

    try {
        const userId = req.session.userId

        const user = await User.findOne({where: {id: userId}, include: Tought, plain: true})

        let emptyToughts = false

        // checando se usuário existe
        if (!user) {
            res.redirect("/login")
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        if (toughts.length === 0) {
            emptyToughts = true
        }

        res.render("toughts/dashboard", {toughts, emptyToughts})   
    } catch (error) {
        console.log(error)
    }
    }

    static async editTought(req, res) {

        const id = req.params.id

        const tought = await Tought.findOne({where: {id:id}, raw: true})

        res.render("toughts/edit", {tought})
    }

    static async editToughtPost(req, res) {

        const {id, title} = req.body

        const tought = {
            title: title
        }

        try {
            await Tought.update(tought, {where: {id: id}})
            
            req.flash("message", "Pensamento atualizado com sucesso.")

            req.session.save(() => {
                res.redirect("/toughts/dashboard")
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async remove(req, res) {
        const {id} = req.body
        const UserId = req.session.userId


        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})

            flash("message", "Pensamento excluído com sucesso.")

            req.session.save(() => {
            res.redirect("/toughts/dashboard")
        })
        } catch (error) {
            console.log(error)
        }
    }

    static newTought(req, res) {
        res.render("toughts/newTought")
    }

    static async newToughtPost(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try {
            await Tought.create(tought)

            req.flash("message", "Pensamento criado com sucesso")

            req.session.save(() =>  {
                res.redirect("/toughts/dashboard")
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}