const Book = require("../models/Book")

module.exports = class BookController {
    static async showBooks(req, res) {
        const books = await Book.getBooks()

        res.render("books/all", {books})
    }

    static createBook(req, res) {
        res.render("books/create")
    }

    static createBookPost(req, res) {

        const {name, image, price, pages, description} = req.body

        const book = new Book(name, image,price, pages, description)



        book.save()
        
        res.redirect("/books")
    }
}