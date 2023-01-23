const express = require("express")
const exphbs = require("express-handlebars")
const port = 5000

const app = express()

const products = [
    {
        id: 0,
        name: "camisa",
        price: 100
    },
    {
        id: 1,
        name: "short",
        price: 60
    },
    {
        id: 2,
        name: "tênis",
        price: 150
    }
]

app.use(express.static("public"))

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.get("/products/:id", (req, res) =>  {
    const product = products[req.params.id]

    res.render("product", {product})
})
app.get("/", (req, res) => {

    res.render("home", {products})
})

app.listen(port, () => {

    console.log(`rodando na porta: ${port}`)
})