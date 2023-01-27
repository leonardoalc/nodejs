const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/conn")

const User = require("./")

const app = express()

// transformando dados recebidos em json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// setanndo handlebars como template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// setado static de css
app.use(express.static("public"))

// página principal
app.get("/", (req, res) => {
    res.render("home")
})


// setando configurações para conexão
app.listen(5000)