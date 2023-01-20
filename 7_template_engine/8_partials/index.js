const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
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

    res.render("blogspot", {post})
})
app.get("/blog", (req, res) => {
    const posts = [
        {
            title: "Aprender node.js",
            category: "javascript",
            body: "Estou aprendendo a programar em node com handlebars",
            comments: 4
        },
        {
            title: "Aprender python",
            category: "python",
            body: "Vou aprender python",
            comments: 90
        },
        {
            title: "Aprendi node.js",
            category: "node",
            body: "Já aprendi node com handlebars",
            comments: 0
        }
    ]

    res.render("blog", {posts})
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