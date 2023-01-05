const express = require("express")
const app = express()
const port = 3000 // variável de ambiente

const path = require("path")

const basePath = path.join(__dirname, "template")

app.get("/", (req, res) => {
    // requisição é oque o usuário envia
    // reposta é oque nós enviamos para o usuário
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})