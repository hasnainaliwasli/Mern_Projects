const express = require('express')
const mongoose = require('mongoose')
const coockieParser = require('cookie-parser')
const cors = require('cors');




mongoose.connect("mongodb+srv://Hasnain:Hasnain@cluster0.b5ydh7b.mongodb.net/").then(() => console.log("MongoDB connected")).catch((err) => console.log(err))

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ' http://localhost:5173/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      "Content-Type",
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true,
  })
)

app.use(coockieParser())
app.use(express.json())
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))