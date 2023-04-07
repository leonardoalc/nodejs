const router = require("express").Router()

const PetController = require("../controllers/PetController")

// middlewares
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload")
const Pet = require("../models/Pet")

router.post("/create", verifyToken, imageUpload.array("images"), PetController.create)
router.get("/", PetController.allPets)
router.get("/userpets", verifyToken, PetController.getUserPets)
router.get("/useradoptions", verifyToken, PetController.getUserAdoptions)
router.get("/:id", verifyToken, PetController.getPetById)
router.delete("/:id", verifyToken, PetController.deletePet)
router.patch("/:id", verifyToken, imageUpload.array("images"), PetController.updatePet)
router.patch("/schedule/:id", verifyToken, PetController.schedule)
router.patch("/conclude/:id", verifyToken, PetController.conclude)


module.exports = router