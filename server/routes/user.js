import express from "express"
import { getUser, addRemoveCourse, addRemoveCourseTaken, getUserAddedModules } from "../controllers/user.js"

const router = express.Router();

router.get("/:id", getUser);

router.patch("/add/:userId/:courseId", addRemoveCourse);

router.patch("/add_taken/:userId/:courseId", addRemoveCourseTaken);

router.get("/:id/added_courses", getUserAddedModules);

export default router