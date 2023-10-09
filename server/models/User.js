import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 12
    },
    year: {
      type: String,
      required: true
    },
    modulesTaken: {
      type: [String],
      required: true,
    },
    modulesAdded : {
      type: [String],
      required: true
    }
  }, {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User