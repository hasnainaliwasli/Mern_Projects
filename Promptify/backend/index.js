const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes.js")
const cors = require("cors")
const categoryRoutes = require("./routes/categoryRoutes.js")
const promptRoutes = require("./routes/promptRoutes.js")


require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("This is first api")
})

try {
  connectDB()
  app.listen(5000, () => {
    console.log("Server is running on localhost 5000")
  })
} catch (error) {
  console.log("Server error", error.message)
}

app.use("/api/users", userRoutes)
app.use('/api/categories', categoryRoutes);
app.use("/api/prompt", promptRoutes)