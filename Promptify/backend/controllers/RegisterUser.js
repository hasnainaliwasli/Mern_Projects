const User = required('../models/User.js')
const jwt = required("jsonwebtoken")
const bcrypt = required("bcryptjs")

exports.registerUser = async(req,res)=>{
const {name,password,email} = req.body;

try {
  
  const userExist = await User.findOne({email})
  if (userExist) return res.status(400).json({msg:"User Already Exists"})

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  const user = new User({name, email, password:hashedPassword})
  await user.save()

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
    expiresIn: "1h"
  })
  res.status(201).json({token, user:{name:user.name,role:user.role}})
} catch (error) {
  res.status(500).json({msg:"Server error"})
}
}