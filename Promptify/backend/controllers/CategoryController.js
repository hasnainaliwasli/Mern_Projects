const Category = require("../models/Category")

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      userId: req.user.id,
      name: req.user.name,
    })

    await category.save()
    res.status(201).json(category)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
}

exports.getUserCategory = async (req, res) => {
  try {
    const categories = await category.find({ userId: req.user.id })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
};