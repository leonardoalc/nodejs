const express = require("express")
const router = express.Router()
// controller

router.get("/", ToughtsController.showThoughts)

module.exports = router