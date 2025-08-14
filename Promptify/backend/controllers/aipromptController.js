const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const streamGroqPrompt = async (req, res) => {
  try {
    const { userPrompt } = req.body;
    if (!userPrompt) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    // Required headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Step 1: Stream from Groq API
    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a prompt refinement engine. 
          Your ONLY task is to take the user's input and rewrite it into a single, clear, well-structured, detailed prompt that is more effective for AI models. Also improve the sentence structure and grammer of the prompt. 
          Do NOT answer the prompt, do NOT add explanations, do NOT include anything except the improved prompt itself. 
          Return only the refined prompt as plain text` },
        { role: "user", content: userPrompt },
      ],
      model: "llama3-70b-8192", //"llama3-8b-8192", // Can change to llama3-70b for better results
      stream: true, // Enable streaming
    });

    // Step 2: Forward stream to frontend
    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content || "";
      if (token) {
        res.write(`data: ${token}\n\n`); // Send chunk to frontend
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (error) {
    console.error("Groq Streaming Error:", error.message);
    res.status(500).json({ message: `Error streaming from Groq: ${error.message}` });
  }
};

module.exports = { streamGroqPrompt };
