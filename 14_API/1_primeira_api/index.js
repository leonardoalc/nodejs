const express = require("express")
const app = express()

app.use(
    express.urlencoded({extended: true})
)
app.use(express.json())

// rotas
app.post("/createbook", (req, res) => {
    const {name, price} = req.body

    if(!name || !price) {
        res.status(422).json({message: "preencha todos os campos obrigatórios."})
    }

    res.status(201).json({message: "Livro cadastrado. "+name})
})

app.get("/", (req, res) => {
    res.status(200).json({message: "Primeira rota criada com sucesso"})
})

app.listen(5000)
