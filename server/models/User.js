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
    // prerequisites or filter
    modulesTaken: {
      type: [{}], // [{courseId:"",courseCode:""}]
      // required: true,
    },
    // courses added by user BUT not assigned
    modulesAdded : {
      type: [{}],// {courseId:"",courseCode:"",index:""}
      // required: true
    },
    // [{courseId:,courseCode:,index:}, ...]
    modulesCurrentIndex: {
      type: [{}],
      // required: true,
    },
    plans : {
      type: Array,
      required: true,
      // default: [[], [], [], [], []]
    }
  }, {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User