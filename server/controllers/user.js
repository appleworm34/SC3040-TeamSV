import Course from '../models/Course.js'
import User from '../models/User.js'

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    
    res.status(200).json(user)
  } catch (e) {
    res.status(404).json({message: e.message})
  }
}

export const addRemoveCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (user.modulesAdded.includes(courseId)) {
      user.modulesAdded = user.modulesAdded.filter((id) => id !== courseId);

    } else {
      user.modulesAdded.push(courseId);
    }

    await user.save();

    res.status(200).json(course.code);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const addRemoveCourseTaken = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (user.modulesTaken.lengthincludes(courseId)) {
      user.modulesTaken = user.modulesTaken.filter((id) => id !== courseId);

    } else {
      user.modulesTaken.push(courseId);
    }

    await user.save();

    res.status(200).json(course.code);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserAddedModules = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    
    res.status(200).json(user.modulesAdded)
  } catch (e) {
    res.status(404).json({message: e.message})
  }
}