import express from "express"
import { getCourse, getAllCourses, submitCourse, getCourseIndex, getAllBdes } from "../controllers/course.js"

const router = express.Router()

router.get("/:id", getCourse)

router.get("/", getAllCourses)

router.get("/bde", getAllBdes)

router.get("/index/:id", getCourseIndex)

router.post("/submit", submitCourse)

export default router