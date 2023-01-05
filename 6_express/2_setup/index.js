const express = require("express")
const app = express()
const port = 3000 // variável de ambiente

app.get("/", (req, res) => {
    // requisição é oque o usuário envia
    // reposta é oque nós enviamos para o usuário
    res.send("Olá, mundo!")
})

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})