const Prompt = require("../models/Prompt")

exports.createPrompt = async (req, res) => {
  try {
    const { title, fullPrompt, categoryId } = req.body;
    const prompt = new Prompt({
      userId: req.user.id,
      title,
      fullPrompt,
      categoryId
    });
    await prompt.save()
    res.status(200).json(prompt)

  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
}


exports.getPromptByCategory = async (req, res) => {
  try {
    const prompts = Prompt.find({
      userId,
      categoryId,
    })
    res.json(prompts)
  } catch (err) {
    res.status(201).json({ msg: "Server error" })
  }
}