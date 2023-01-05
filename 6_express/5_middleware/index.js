const express = require("express")
const app = express()
const port = 3000 // variável de ambiente

const path = require("path")

const basePath = path.join(__dirname, "template")

const checkAuth = function(req, res, next) {
    req.authStatus = true

    if(req.authStatus) {
        console.log("Está logado")
        next()
    } else {
        console.log("Não está logado")
        next()
    }
}

app.use(checkAuth)

app.get("/", (req, res) => {
    // requisição é oque o usuário envia
    // reposta é oque nós enviamos para o usuário
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})