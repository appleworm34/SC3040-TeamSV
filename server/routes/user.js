import express from "express"

import {deleteUser, deleteAllUsers, getUser, addRemoveCourse, addRemoveCourseTaken, getAllUsers, addDesiredIndex, removeDesiredIndex, getUserAddedModules, getUserPlans, updatePlans} from "../controllers/user.js"

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUser);


router.post("/delete-all",deleteAllUsers);
router.post("/delete-user/:id",deleteUser);

router.patch("/add/:userId/:courseId/:index", addRemoveCourse)

router.patch("/add-taken/:userId/:courseId/:index", addRemoveCourseTaken)

router.post("/add-desired",addDesiredIndex)
router.post("/remove-desired",removeDesiredIndex)


router.get("/:id/added_courses", getUserAddedModules);

router.get("/:id/plans", getUserPlans);

router.put("/:id/update_plans", updatePlans);


export default router