// modulos externos
const express = require("express")

// core modules
const path = require("path")

// vars
const basePath = path.join(__dirname, "templates")
const app = express()
const port = 5000
const productsRoute = require("./products")

// lendo body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// estáticos
app.use(express.static("public"))

app.use("/products", productsRoute)

app.get("/", (req, res) => {

    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})