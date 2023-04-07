const express = require("express")
const cors = require("cors")

const app = express()

const port = 5000

const userRoutes = require("./routes/userRoutes")
const petRoutes = require("./routes/petRoutes")

// configurando resposta
app.use(express.json())

// CORS
// liberando o cross origin resource sharing
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// Rotas
app.use("/users", userRoutes)
app.use("/pets", petRoutes)

app.listen(port, () => {console.log("Aplicação rodando.")})