import Course from '../models/Course.js'
import User from '../models/User.js'

export const deleteUser = async (req,res) => {
  try {
    const {id} = req.params
    console.log(id)
    const deletedUser = await User.findByIdAndRemove(id);
    if (deletedUser) {
      console.log(`Deleted user: ${deletedUser.name}`);
    } else {
      console.log('User not found.');
    }
    res.status(200).json({message:"pass"})

  } catch(e){
    res.status(404).json({message:e.message})
  }

}

export const deleteAllUsers = async (req, res) => {
  try {
    // Use the deleteMany method to delete all documents in the "User" collection
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} user(s)`);    
    res.status(200).json({message:"deleted all users"})
  } catch (e) {
    res.status(404).json({message: e.message})
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    
    res.status(200).json(user)
  } catch (e) {
    res.status(404).json({message: e.message})
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const addRemoveCourse = async (req, res) => {
  try {
    const { userId, courseId, index } = req.params;
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
    const { userId, courseId, index } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (user.modulesTaken.includes(courseId)) {
      user.modulesTaken = user.modulesTaken.filter((id) => id !== courseId);
      user.modulesCurrentIndex = user.modulesCurrentIndex.filter((arr) => arr[0]!==courseId)
      user.modulesDesiredIndex = user.modulesDesiredIndex.filter((arr) => arr[0]!==courseId)
    } else {
      user.modulesTaken.push(courseId);
      user.modulesCurrentIndex.push([courseId,course.courseCode,index])
      // user.modulesDesiredIndex.push([course.courseName,index])
    }
    

    await user.save();

    res.status(200).json({message: course.code});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const addDesiredIndex = async (req, res) => {
  try {
    const userId = req.body['userId']
    const courseCode = req.body['courseCode']
    const indexes = req.body['indexes']
    const user = await User.findById(userId);
    const courseId = user.modulesCurrentIndex.find(arr => arr[1]==courseCode)[0]
    // can add
    const array1 = user.modulesDesiredIndex.find((arr)=>arr[1]==courseCode)?user.modulesDesiredIndex.find((arr)=>arr[1]==courseCode)[2]:[];
    const array2 = indexes;

    const mergedArray = Array.from(new Set(array1.concat(array2)));

    // console.log(mergedArray); // [1, 2, 3, 4, 5]
    // res.json({
    //   msg:[courseId,courseCode,mergedArray]
    // })
    // user.modulesDesiredIndex = []
    user.modulesDesiredIndex.push([courseId,courseCode,mergedArray])
    // user.modulesDesiredIndex.push(mergedArray)
    // user.modulesDesiredIndex = [courseId,courseCode,mergedArray]
    
    // user.modulesAdded = []
    // user.modulesTaken = ["652f3f113eed7ca480f1c168","652f3f113eed7ca480f1c169"]
    // user.modulesCurrentIndex =[]
    // user.modulesDesiredIndex = []
    // user.modulesCurrentIndex = [["652f3f113eed7ca480f1c168","CZ1107","10524"],["652f3f113eed7ca480f1c169","CZ1113","10535"]]
    // user.modulesDesiredIndex = [["652f3f113eed7ca480f1c168","CZ1107",["10545","10555"]],["652f3f113eed7ca480f1c169","CZ1113",["10536","10546"]]]
    await user.save();

    res.status(200).json({usr:user.modulesDesiredIndex, msg:mergedArray});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const removeDesiredIndex = async (req, res) => {
  try {
    const userId = req.body['userId']
    const courseCode = req.body['courseCode']
    const indexes = req.body['indexes']
    const user = await User.findById(userId);

    if (!user.modulesCurrentIndex.find(arr => arr[1]==courseCode)){
      res.json({
        message:"module is not yet assigned to user!"
      })
      return
    }
    const courseId = user.modulesCurrentIndex.find(arr => arr[1]==courseCode)[0]
    // can add
    const array1 = user.modulesDesiredIndex.find((arr)=>arr[1]==courseCode)[2];
    const array2 = indexes;

    const mergedArray = Array.from(new Set(array1.concat(array2)));

    // console.log(mergedArray); // [1, 2, 3, 4, 5]
    user.modulesDesiredIndex = [courseId,courseCode,mergedArray]

    await user.save();

    res.status(200).json(courseName);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const swapIndex = async (userId,courseCode,desiredIndex) => {
  const user = await User.findById(userId);
  //update current index
  user.modulesCurrentIndex.map((module)=>{
    if (module.courseCode==courseCode){
      module.index=desiredIndex
    }
  })
  try{
    console.log("user")
    console.log(desiredIndex)
    await user.save();
    console.log(user)
  }catch(e){
    console.log("e",e)
  }
  
  //
}