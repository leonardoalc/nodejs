const express = require("express")
const cors = require("cors")

const app = express()

const userRoutes = require("./routes/userRoutes")

// configurando resposta
app.use(express.json())

// CORS
// liberando o cross origin resource sharing
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// Rotas
app.use("/users", userRoutes)

app.listen(5000, () => {console.log("Aplicação rodando.")})