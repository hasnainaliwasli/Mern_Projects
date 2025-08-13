const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    name: { type: String, require: true }
  }
)

module.exports = mongoose.model("Category", categorySchema);