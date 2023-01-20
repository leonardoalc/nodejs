const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set("view engine", "handlebars")

app.get("/dashboard", (req, res) => {

    const itens = ["a", "b", "c"]

    res.render("dashboard", { itens })
})
app.get("/post", (req, res) => {

    const post = {
        title: "Aprender node.js",
        category: "javascript",
        body: "Estou aprendendo a programar em node com handlebars",
        comments: 4
    }

    res.render("post", {post})
})
app.get("/", (req, res) => {
    const user = {
        name: "Leonardo",
        surname: "Alcantara",
        age: 19
    }

    const auth = true
    const approved = true

    res.render("home", { user: user, auth, approved}) // você pode simplificar para {user} por terem o nome igual.
})

app.listen(3000, () => {
    console.log("App funcionando!")
})