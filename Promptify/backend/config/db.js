const mongoose = require("mongoose")

const conectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Succesfully")
  } catch (error) {
    console.log("MongoDB Error", error.message)
    process.exit(1)
  }
}

module.exports = conectDB