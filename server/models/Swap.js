import mongoose from "mongoose"

// userid,courseCode,currentIndex,desiredIndex:[]
const swapSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: ""
    },
    courseCode: {
      type: String,
      default: ""
    },
    currentIndex: {
      type: String,
      default: ""
    },
    desiredIndex: {
      type: [String],
      default: ""
    }
  }
)

const Swap = mongoose.model("Swap", swapSchema)

export default Swap