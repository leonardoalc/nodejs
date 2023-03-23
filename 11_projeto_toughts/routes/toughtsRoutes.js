const express = require("express")
const router = express.Router()
const ToughtController = require("../controllers/ToughtController")

// helpers
const checkAuth = require("../helpers/auth").checkAuth

router.get("/", ToughtController.showAll)
router.get("/dashboard", checkAuth, ToughtController.dashboard)
router.post("/remove", checkAuth, ToughtController.remove)
router.get("/add", checkAuth,ToughtController.newTought)
router.get("/edit/:id", checkAuth,ToughtController.editTought)
router.post("/edit", checkAuth,ToughtController.editToughtPost)
router.post("/add", checkAuth, ToughtController.newToughtPost)

module.exports = router