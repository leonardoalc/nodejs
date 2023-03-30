const express = require("express")
const router = express.Router()

const BookController = require("../controllers/BookController")

router.post("/create", BookController.createBookPost)
router.get("/create", BookController.createBook)
router.get("/", BookController.showBooks)

module.exports = router