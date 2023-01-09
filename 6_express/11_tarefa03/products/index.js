const express = require("express")
const path = require("path")


const basePath = path.join(__dirname, "../templates")
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(`${basePath}/products.html`)
})

router.get("/:id", (req, res) => {
    res.sendFile(`${basePath}/productid.html`)
})

module.exports = router