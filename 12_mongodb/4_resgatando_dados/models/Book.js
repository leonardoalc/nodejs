const conn = require("../db/conn")

class Book {

    constructor(name, image, price, pages, description) {
        this.name = name
        this.image = image
        this.price = price
        this.pages = pages
        this.description = description
    }

    save() {
        const book = conn.db().collection("books").insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            pages: this.pages,
            description: this.description
        })

        return book
    }

    static getBooks() {
        const books = conn.db().collection("books").find().toArray()

        return books
    }
}

module.exports = Book