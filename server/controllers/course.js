import Course from "../models/Course.js"

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Course.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getCourseIndex = async (req,res) => {
  try {
    const {id} = req.params;
    const course = await Course.findById(id);
    const indexes = course.indexes.map((indexStruct)=>{
      return indexStruct.indexNo
    })
    res.status(200).json({indexes:indexes});
  }catch (err){
    res.status(404).json({ message: err.message });
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const submitCourse = async (req, res) => {
  try {
    const { courseCode, courseName, courseNumOfAU, indexInfo, isBDE } = req.body;

    const newCourse = new Course({
        courseCode,
        courseName,
        courseNumOfAU,
        indexInfo,
        isBDE
    });

    await newCourse.save();

    const course = await Course.find();
    res.status(201).json(course);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}
