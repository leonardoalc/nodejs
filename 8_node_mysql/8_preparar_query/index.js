const express = require("express")
const exphbs = require("express-handlebars")
const pool = require("./db/conn")


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

// criação e postagem de livro no banco de dados
// a action do formulário será  a mesma action do post
// ao final, redirecione o usuário para a página pricipal.
app.post("/books/insertbook", (req, res) => {
    const title = req.body.title
    const pages = req.body.pagesqty

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ["title", "pages", title, pages]

    pool.query(sql, data, function(err) {
        if(err) {
            console.log(err.message)
            return
        }
        res.redirect("/")
    })
})

// conseguindo dados do banco de dados
app.get("/books", (req, res) => {

    const sql = "SELECT * FROM books"

    pool.query(sql, function(err, data) {
        if(err) {
            console.log(err.message)
            return
        }

        const books = data
        res.render("books", {books})
    })
})

// selecionando um dado específico com o id do banco de dados
app.get("/books/:id", (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ["idbooks", id]
    pool.query(sql, data, function(err, data) {
        if(err) {
            console.log(err.message)
            return
        }

        const book = data[0]

        res.render("book", {book})
    })
})

// criando página de edição dados
app.get("/books/edit/:id", (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE idbooks = ${id}`

    pool.query(sql, function(err, data) {
        if(err) {
            console.log(err.message)
            return
        }

        const book = data[0]

        res.render("editbook", {book})
    })
})

// subindo edições
app.post("/books/updatebook", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pages = req.body.pagesqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ["title", title, "pages", pages, "idbooks", id]
    pool.query(sql, data, function(err) {
        if(err) {
            console.log(err.message)
            return
        }

        res.redirect("/books")
    })
})
app.post("/books/remove/:id", (req, res) => {
    const id =  req.params.id

    const sql = `DELETE FROM books WHERE idbooks = ${id}`

    pool.query(sql, function(err) {
        if(err) {
            console.log(err.message)
            return
        }

        res.redirect("/books")
    })
})

// setando configurações para conexão
app.listen(5000)