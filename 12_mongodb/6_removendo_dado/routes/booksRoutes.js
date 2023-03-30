const express = require("express")
const router = express.Router()

const BookController = require("../controllers/BookController")
// rotas para criação de um lívro
router.post("/create", BookController.createBookPost)
router.get("/create", BookController.createBook)

// rota para resgate de livro único
router.get("/:id", BookController.getBook)

// rota para remoção de livro
router.post("/remove/:id", BookController.removeBook)

// Rota principal + resgatando todos os livros
router.get("/", BookController.showBooks)

module.exports = router