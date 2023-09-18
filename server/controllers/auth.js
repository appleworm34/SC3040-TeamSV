import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
  try {
      console.log("register req body: ", req.body)
      const {
          name,
          email,
          password,
          year,
          modulesTaken
      } =  req.body

      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)

      const newUser = new User({
          name,
          email,
          password: passwordHash,
          year,
          modulesTaken
      })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
  } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message})
  }
};

export const login = async (req, res) => {
  try{
      const { email, password } = req.body;
      const user = await User.findOne({ email: email})
      if (!user) return res.status(400).json({ msg: "User does not exist."})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "})
      
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
      delete user.password
      res.status(200).json({ token, user })

  } catch (err) {
      res.status(500).json({ error: err.message})
  }
}