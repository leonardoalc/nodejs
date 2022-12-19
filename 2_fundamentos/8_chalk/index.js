const chalk = require("chalk")

const nota = 4

if (nota >= 7) {
    console.log(chalk.bgCyan.bold.magentaBright("Parabéns, você está aprovado."))
} else {
    console.log(chalk.bgRed.italic.white("Você está reprovado"))
}