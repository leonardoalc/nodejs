const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("toughts", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

try {
    sequelize.authenticate()
    console.log("Conectamos ao banco!")
} catch (error) {
    console.log("Não foi possível conectar... Erro: " + error)
}

module.exports = sequelize