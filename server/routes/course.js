import express from "express"
import { getCourse, submitCourse } from "../controllers/course.js"

const router = express.Router();

router.get("/:id", getCourse);

router.post("/submit", submitCourse)

export default router