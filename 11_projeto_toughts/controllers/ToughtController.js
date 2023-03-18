const Tought = require("../models/Tought")
const User = require("../models/User")

module.exports = class ToughtController {
    static async showAll(req, res) {

        res.render("toughts/home")
    }
}