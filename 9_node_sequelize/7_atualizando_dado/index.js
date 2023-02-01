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

// rota para criar usuário
app.get("/createuser", (req, res) => {
    res.render("adduser")
})

// post de criação de usuário
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

// usando where
app.get("/users/:id", async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render("user", {user})
})

// deletando dado
app.post("/users/delete/:id", async (req, res) => {
    const id = req.params.id

    await User.destroy({where: {id: id}})

    res.redirect("/")
})

// editando dado
app.get("/users/edit/:id", async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    console.log(user)
    res.render("editdata", {user})
})
app.post("/users/updatedata", async (req, res) => {

    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    if (newsletter === "on") {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {where: {id: id}})

    res.redirect("/")
})
// página principal
app.get("/", async (req, res) => {

    const users = await User.findAll({raw: true})
    
    res.render("home", { users: users })
})

// setando configurações para conexão
conn
    //.sync()
    .sync({ force: true })
    .then(() => {
        app.listen(5000)
    }).catch(err => console.log(err.message))