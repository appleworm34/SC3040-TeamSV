import express from "express"
import {deleteAllUsers, getUser, addRemoveCourse, addRemoveCourseTaken, getAllUsers, addDesiredIndex, removeDesiredIndex} from "../controllers/user.js"

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUser);

router.post("/delete-all",deleteAllUsers);

router.patch("/add/:userId/:courseId/:index", addRemoveCourse)

router.patch("/add-taken/:userId/:courseId/:index", addRemoveCourseTaken)

router.post("/add-desired",addDesiredIndex)
router.post("/remove-desired",removeDesiredIndex)

export default router