import express from "express"
import { getCourse, getAllCourses, submitCourse } from "../controllers/course.js"

const router = express.Router()

router.get("/:id", getCourse)

router.get("all", getAllCourses)

router.post("/submit", submitCourse)

export default router