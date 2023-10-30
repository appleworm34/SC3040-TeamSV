import express from "express"

import {deleteUser, deleteAllUsers, getUser, registerCourse, addRemoveCourseTaken, getAllUsers, addDesiredIndex, removeDesiredIndex, getUserAddedModules, getUserPlans, updatePlans, getUserCredit, updateCredit} from "../controllers/user.js"

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUser);


router.post("/delete-all",deleteAllUsers);
router.post("/delete-user/:id",deleteUser);

router.put("/add-courses/:id", registerCourse)

router.patch("/add-taken/:userId/:courseId/:index", addRemoveCourseTaken)

router.post("/add-desired",addDesiredIndex)
router.post("/remove-desired",removeDesiredIndex)

router.get("/:id/added_courses", getUserAddedModules);

// router.get("/:id/current_courses", getUserCurrentIndex);

router.get("/:id/plans", getUserPlans);

router.put("/:id/update_plans", updatePlans);

router.get("/:id/credit", getUserCredit);

router.put("/:id/update_credit", updateCredit);

export default router