const router = require('express').Router()
const petsController = require('../controllers/PetsController')

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-uploads')

router.post('/create', verifyToken, imageUpload.array('images'), petsController.create)
router.get("/", petsController.getAllPets);
router.get("/mypets", verifyToken, petsController.getAllUserPets)
router.get("myadoptions", verifyToken, petsController.getAllUserAdoptions)



module.exports = router