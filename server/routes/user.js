import express from "express"
import { getUser, addRemoveCourse, addRemoveCourseTaken } from "../controllers/user.js"

const router = express.Router();

router.get("/:id", getUser);

router.patch("/add/:userId/:courseId", addRemoveCourse)

router.patch("/add-taken/:userId/:courseId", addRemoveCourseTaken)

export default router