const mongoose = require("mongoose")

const conectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Succesfully")
  } catch (error) {
  console.log("MongoDB Error",error.message)
  process.exit(1)
  }
}

module.exports = conectDB