import express from "express"
import { getCourse, getAllCourses, submitCourse, getCourseIndex } from "../controllers/course.js"

const router = express.Router()

router.get("/:id", getCourse)

router.get("/", getAllCourses)

router.get("/index/:id", getCourseIndex)

router.post("/submit", submitCourse)

export default router