const Book = require("../models/Book")

module.exports = class BookController {
    static showBooks(req, res) {
        res.render("books/all")
    }

    static createBook(req, res) {
        res.render("books/create")
    }

    static async createBookPost(req, res) {

        const {name, price, pages, description} = req.body

        const book = new Book(name, price, pages, description)

        book.save()
        
        res.redirect("/books")
    }
}