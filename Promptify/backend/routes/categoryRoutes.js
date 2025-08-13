const express = require("express")
const router = express.Router()
const { createCategory, getUserCategory } = require("../controllers/categoryController")
const protect = require("../middleware/authMiddleware")

router.post('/', protect, createCategory); 
router.get("/", protect, getUserCategory);

module.exports = router