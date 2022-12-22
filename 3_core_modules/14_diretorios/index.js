const fs = require("fs")

if (!fs.existsSync("./minhapasta")) {
    console.log("Não existe")
    // criando diretorio
    fs.mkdirSync("minhapasta")
} else if (fs.existsSync("./minhapasta")) {
    console.log("existe")
    // deletando diretorio
    fs.rmdirSync("minhapasta")
}