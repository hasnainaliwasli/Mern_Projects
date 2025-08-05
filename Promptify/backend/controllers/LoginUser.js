const User = require("../models/User.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LoginUser = async(req,res)=>{
  const {email,password} = req.body;

  try {
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({msg:"User not found"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json("Invalid Password")

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
      expiresIn: '1h'
    })

    res.status(200).json({token, user:{name:user.name, role:user.role}})
  } catch (error) {
    res.status(500).json({msg:"Server Error"})
  }

}

module.exports = {LoginUser}