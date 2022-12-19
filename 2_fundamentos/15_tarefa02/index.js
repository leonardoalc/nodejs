const inquirer = require("inquirer")
const chalk = require("chalk")

inquirer.prompt([
    {
        name: "nome",
        message: "Digite seu nome: "
    },
    {
        name: "age",
        message: "Digite a sua idade: "
    }
]).then((awnsers) => {
    if (!awnsers.nome || !awnsers.age) {
        throw new Error("Responda")
    }

    const resposta = `Seu nome é ${awnsers.nome} e sua idade é ${awnsers.age}`

    console.log(chalk.bgYellow.black(resposta))
}).catch(err => {
    console.log(err)
})