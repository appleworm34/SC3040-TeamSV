import express from "express"
import { getUser, addRemoveCourse, addRemoveCourseTaken, getUserAddedModules, getUserPlans, updatePlans } from "../controllers/user.js"

const router = express.Router();

router.get("/:id", getUser);

router.patch("/add/:userId/:courseId", addRemoveCourse);

router.patch("/add_taken/:userId/:courseId", addRemoveCourseTaken);

router.get("/:id/added_courses", getUserAddedModules);

router.get("/:id/plans", getUserPlans);

router.put("/:id/update_plans", updatePlans);

export default router