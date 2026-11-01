import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourseById);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updateCourse);
router.delete("/:id", coursesController.deleteCourse);

router.put("/:id/teacher", coursesController.changeTeacher);
router.post("/:id/students", coursesController.addStudentToCourse);
router.delete("/:id/students/:studentId", coursesController.removeStudentFromCourse);

export default router;
