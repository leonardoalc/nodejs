/* const conn = require("../db/conn")
const {ObjectId} = require("mongodb")

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

    static async getBook(id) {

        const objectId = new ObjectId(id)

        const book = await conn.db().collection("books").findOne({_id: objectId})

        return book
    }

    static async removeBook(id) {
        const objectId = new ObjectId(id)

        await conn.db().collection("books").deleteOne({_id: objectId})

        return
    }

    rsupdateBook(id) {

        const objectId = new ObjectId(id)

        conn.db().collection("books").updateOne({_id: objectId}, {$set: this})

        return
    }
} */

const mongoose = require("mongoose")
const {Schema} = mongoose

const Book = mongoose.model(
    'Book',
    new Schema({
        name: { type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        pages: {type: Number, required: true},
        description: {type: String, required: true}
    })
)

module.exports = Book