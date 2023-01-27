const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("nodesequelize", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

try {
    sequelize.authenticate()
    console.log("Conectou")
} catch (err) {
    console.log("Não foi possível conectar!")
    console.log(err)
}

module.exports = sequelize