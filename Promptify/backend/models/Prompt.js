const mongoose = require("mongoose")

const promptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    categoryId: { type: mongoose.Schema.ObjectId, ref: "Category", require: true },
    title: { type: String, require: true },
    fullPrompt: { type: String, require: true }
  }
)

module.exports = mongoose.model("Prompt", promptSchema);