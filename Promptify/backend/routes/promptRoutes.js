const express = require("express")
const router = express.Router()
const { createPrompt, getPromptByCategory } = require("../controllers/promptController")
const { streamGroqPrompt} = require("../controllers/aipromptController")
const protect = require("../middleware/authMiddleware")

router.post("/", protect, createPrompt)
router.get("/:categoryId", protect, getPromptByCategory)
router.post("/generate", protect, streamGroqPrompt)


module.exports = router