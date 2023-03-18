const express = require("express")
const router = express.Router()
const ToughtController = require("../controllers/ToughtController")

router.get("/", ToughtController.showAll)

module.exports = router