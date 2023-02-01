const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/conn")

const User = require("./models/User")

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

app.get("/createuser", (req, res) => {
    res.render("adduser")
})
app.post("/users/create", async (req, res) => {

    const name = req.body.name.toLowerCase()
    const occupation = req.body.occupation.toLowerCase()
    let newsletter = req.body.newsletter

    if(newsletter === "on") {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect("/")
})

// página principal
app.get("/", async (req, res) => {

    const users = await User.findAll({raw: true})
    
    res.render("home", { users: users })
})

// setando configurações para conexão
conn.sync().then(() => {
    app.listen(5000)
}).catch(err => console.log(err.message))