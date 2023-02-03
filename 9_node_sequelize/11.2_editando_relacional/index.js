const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/conn")

const User = require("./models/User")
const Address = require("./models/Address")
const { raw } = require("express")

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

    try {
        const user = await User.findOne({ include: Address, where: {id: id}})

    res.render("editdata", {user: user.get({plain: true})})
    } catch(err) {
        console.log(err)
    }
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

// adicionanndo endereço com relacionamento
app.post("/address/create", async (req, res) => {

    const UserId= req.body.UserId // peguei o UserId com input hidden o form
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    // salvando todos os dados dentro de um objeto, tendo os nomes escritos de forma igual aos salvos
    // js é casesensitive, não se esqueça.
    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)
})

// endereço de edição com relacional
app.get("/address/edit/:id", async (req, res) => {

    const id = req.params.id

    const address = await Address.findOne( {raw: true, where: {id: id}})

    console.log(address)

    res.render("editaddress", {address})
})

// post de edição de dado relacional
app.post("/address/update", async (req, res)  => {
    const UserId = req.body.UserId
    const id = req.body.id
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        id,
        street,
        number,
        city,
        UserId
    }

    await Address.update(address, {where: {id: id}})

    res.redirect(`/users/edit/${UserId}`)
})
// página principal
app.get("/", async (req, res) => {

    const users = await User.findAll({raw: true})
    
    res.render("home", { users: users })
})

// setando configurações para conexão
conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(5000)
    })
    .catch(err => console.log(err.message))