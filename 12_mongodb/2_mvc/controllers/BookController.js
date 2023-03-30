const Book = require("../models/Book")

module.exports = class BookController {
    static showBooks(req, res) {
        res.render("books/all")
    }
}