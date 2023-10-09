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

export const submitCourse = async (req, res) => {
  try {
    const { code, name, numOfAU, indexInfo, isBDE } = req.body;

    const newCourse = new Course({
        code,
        name,
        numOfAU,
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
