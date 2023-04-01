const Book = require("../models/Book")

module.exports = class BookController {
    // controle principal + resgate de todos os livros
    static async showBooks(req, res) {
        const books = await Book.find().lean()

        res.render("books/all", {books})
    }

    //  controles de criação de livro
    static createBook(req, res) {
        res.render("books/create")
    }
    static async createBookPost(req, res) {

        const {name, image, price, pages, description} = req.body

        const book = new Book({name, image, price, pages, description})

        await book.save()
        
        res.redirect("/books")
    }

  // controle para resgate de livro único
    static async getBook(req, res) {

        const {id} = req.params

        const book = await Book.findById(id).lean()

        res.render("books/book", { book })
    } 
/* 
    // controle para remoção de livro
    static async removeBook(req, res) {
        const {id} = req.params

        await Book.removeBook(id)

        res.redirect("/books")
    }

    // controles para edição de livro
    static async editBook(req, res) {
        const {id} = req.params

        const book = await Book.getBook(id)

        res.render("books/edit", {book})
    }
    static async editBookPost(req, res) {
        const {id, name, image, price, pages, description} = req.body

        const book = new Book(name, image, price, pages, description)

        await book.updateBook(id)

        res.redirect("/books")
    } */
}