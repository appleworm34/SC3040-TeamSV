import express from "express"
// import { getCourse, getAllCourses, submitCourse, getCourseIndex } from "../controllers/course.js"
import {addSwap,getSwaps} from "../controllers/swap.js"
const router = express.Router()

router.post("/add", addSwap)

router.get("/",getSwaps)

export default router