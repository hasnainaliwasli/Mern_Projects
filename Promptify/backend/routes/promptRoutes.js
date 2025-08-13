const express = require("express")
const router = express.Router()
const { createPrompt, getPromptByCategory } = require("../controllers/promptController")
const protect = require("../middleware/authMiddleware")

router.post("/", protect, createPrompt)
router.get("/:categoryId", protect, getPromptByCategory)

module.exports = router