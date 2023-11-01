import express from "express"
import { getCourse, getAllNonBDECourses, submitCourse, getCourseIndex, getAllBdes } from "../controllers/course.js"

const router = express.Router()

router.get("/bde", getAllBdes)

router.post("/submit", submitCourse)

router.get("/:id", getCourse)

router.get("/", getAllNonBDECourses)

router.get("/index/:id", getCourseIndex)



export default router