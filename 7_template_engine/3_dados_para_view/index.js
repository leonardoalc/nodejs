const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set("view engine", "handlebars")

app.get("/dashboard", (req, res) => {

    res.render("dashboard")
})

app.get("/", (req, res) => {
    const user = {
        name: "Leonardo",
        surname: "Alcantara",
        age: 19
    }

    const auth = true

    const palavra = "palavraaaaa"
    res.render("home", { user: user, palavra, auth}) // você pode simplificar para {user} por terem o nome igual.
})

app.listen(3000, () => {
    console.log("App funcionando!")
})