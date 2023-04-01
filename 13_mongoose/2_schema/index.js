const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

const conn = require("./db/conn")

const booksRoutes = require("./routes/booksRoutes")

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static("public"))

app.use("/books", booksRoutes)

app.use(express.json())

app.listen(5000)