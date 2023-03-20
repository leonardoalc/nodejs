// importações do express
const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const flash = require("express-flash")

// outras importações
const FileStore = require("session-file-store")(session)
const conn = require("./db/conn")

// importando routes
const toughtsRoutes = require("./routes/toughtsRoutes")
const authRoutes = require("./routes/authRoutes")

// outros
const ToughtController = require("./controllers/ToughtController")

// models
const Tought = require("./models/Tought")
const User =  require("./models/User")

// aplicação
const app = express()
const port = 5000

// template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// receber resposta
app.use(
    express.urlencoded({
        extended: true
    })
)

// middleware de session
// ele diz onde o express irá salvar as seções
app.use(
    session({
        name: "session",
        secret: "secrettoughts",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require("path").join(require("os").tmpdir(), "sessions")
        }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
    })
)
// flash  messages 
app.use(flash())


// public path
app.use(express.static("public"))

// colocando seção dentro do res
// caso o usuário esteja autenticado, a session criada será colocada dentro das requisições
// permitindo que tenhamos o userId, por exemplo, em todas as requisições. Facilitando o código.
app.use((req, res, next) => {

    if (req.session.userId) {
        res.locals.session = req.session
    }

    next()
})

// routes
app.use("/toughts", toughtsRoutes)
app.use("/",authRoutes)

app.get("/", ToughtController.showAll)

// rodando a aplicação
conn
    //.sync({force: true})
    .sync()
    .then(() => app.listen(port, () => console.log("Rodando na porta: " + port)))
    .catch((err) => console.log("Não foi possível rodar a aplicação... Erro: " + err)) 