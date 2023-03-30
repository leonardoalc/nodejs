const conn = require("../db/conn")

class Book {

    constructor(name, price, pages, description) {

        this.name = name
        this.price = price,
        this.pages = pages,
        this.description = description

    }

    save() {
        const product = conn.db().collection("books").insertOne({
            name: this.name,
            price: this.price,
            pages: this.pages,
            description: this.description
        })
    }
}

module.exports = Book