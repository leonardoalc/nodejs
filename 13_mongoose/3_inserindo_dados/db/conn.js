/* const {MongoClient} = require("mongodb")

//127.0.1 no lugar de localhost
const uri = "mongodb://127.0.0.1:27017/mongoteste"

const client = new MongoClient(uri)

async function run() {
    try {
        
        await client.connect()
        console.log("Conectando ao MongoDB")

    } catch (error) {
        console.log(error)
    }
}

run()

module.exports = client */

const mongoose = require("mongoose")

async function main() {
    // 127.0.0.1 no lugar de localhost
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoteste2")
    console.log("Conectou ao MongoDB com Mongoose")
}
main().catch((err) => console.log(err))

module.exports = mongoose