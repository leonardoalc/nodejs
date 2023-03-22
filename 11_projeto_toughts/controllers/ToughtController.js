const flash = require("express-flash")
const Tought = require("../models/Tought")
const User = require("../models/User")

module.exports = class ToughtController {
    static async showAll(req, res) {
        res.render("toughts/home")
    }

    static async dashboard(req, res) {

        const userId = req.session.userId

        const user = await User.findOne({where: {id: userId}, include: Tought, plain: true})

        // checando se usuário existe
        if (!user) {
            res.redirect("/login")
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        res.render("toughts/dashboard", {toughts})
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