const { Sequelize } = require("sequelize")

// criando um novo objeto Sequelize, nodemvc é o nome do schema
// root é o usuário e "" indica que a senha está vázia.
// Crie um schema no workbench com o mesmo nome.
const sequelize = new Sequelize("nodemvc", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

try {
    
    sequelize.authenticate()
    console.log("Conectado ao MySQL!")

} catch (error) {
    console.log("Não foi possível conectar. Erro: " + error)
}

module.exports = sequelize