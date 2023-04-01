const express = require("express")
const router = express.Router()

const BookController = require("../controllers/BookController")

// rotas para criação de um lívro
router.post("/create", BookController.createBookPost)
router.get("/create", BookController.createBook)

// rota para resgate de livro único
router.get("/:id", BookController.getBook)
/* 
// rota para remoção de livro
router.post("/remove/:id", BookController.removeBook)

// rotas para edição de livro
router.get("/edit/:id", BookController.editBook)
router.post("/edit", BookController.editBookPost)
*/
// Rota principal + resgatando todos os livros
router.get("/", BookController.showBooks) 

module.exports = router