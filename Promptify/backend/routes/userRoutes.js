const express = require("express")
const router = express.Router()
const { LoginUser } = require("../controllers/LoginUser.js")
const { RegisterUser } = require("../controllers/RegisterUser.js")

router.post("/register", RegisterUser)
router.post("/login", LoginUser)

module.exports = router