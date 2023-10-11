import mongoose from "mongoose"

const indexSchema = new mongoose.Schema(
  {
    indexNo: {
      type: String,
      default: ""
    },
    lessons: [
      {
        type: {
          type: String,
          default: ""
        },
        group: {
          type: String,
          default: ""
        },
        day: {
          type: String,
          default: ""
        },
        time: {
          type: String,
          default: ""
        },
        venue: {
          type: String,
          default: ""
        },
        remarks: {
          type: String,
          default: ""
        },
      }
    ]
  }
)

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      default: ""
    },
    courseName: {
      type: String,
      default: ""
    },
    courseNumOfAU: {
      type: String,
      default: ""
    },
    indexes: [indexSchema],
    isBDE: {
      type: Boolean,
    },
    desc: {
      type: String,
      default: ""
    }
  }
)

const Course = mongoose.model("Course", courseSchema)

export default Course