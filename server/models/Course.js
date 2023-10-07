import mongoose from "mongoose"

const indexSchema = new mongoose.Schema(
  {
    index: {
      type: String,
      required: true
    },
    lessons: [
      {
        type: {
          type: String,
          required: true
        },
        group: {
          type: String,
          required: true
        },
        day: {
          type: String,
          required: true
        },
        time: {
          type: String,
          required: true
        },
        venue: {
          type: String,
          required: true
        },
        remarks: {
          type: String,
          required: true,
          default: ""
        },
      }
    ]
  }
)

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    numOfAU: {
      type: Number,
      required: true
    },
    indexInfo: [indexSchema],
  }
)

const Course = mongoose.model("Course", courseSchema)

export default Course