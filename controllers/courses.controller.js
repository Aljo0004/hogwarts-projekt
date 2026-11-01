import * as coursesRepository from "../repositories/courses.repository.js";
import * as teachersRepository from "../repositories/teachers.repository.js";
import * as studentsRepository from "../repositories/students.repository.js";

// GET /courses
export async function getAllCourses(req, res) {
  try {
    const allCourses = await coursesRepository.getAllCourses();
    res.status(200).json(allCourses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// GET /courses/:id
export async function getCourseById(req, res) {
  try {
    const course = await coursesRepository.getCourseById(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// POST /courses
export async function createCourse(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const course = await coursesRepository.createCourse(req.body.name, req.body.teacher_id);
    res.status(201).json(course);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// PUT /courses/:id
export async function updateCourse(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const course = await coursesRepository.updateCourse(req.params.id, req.body.name);
    if (course) {
      res.status(200).json(course);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// DELETE /courses/:id
export async function deleteCourse(req, res) {
  try {
    const deleted = await coursesRepository.deleteCourse(req.params.id);
    if (deleted) {
      res.status(200).send({ message: "Course deleted" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// PUT /courses/:id/teacher
export async function changeTeacher(req, res) {
  try {
    if (!req.body.teacher_id) {
      return res.sendStatus(400);
    }
    const teacher = await teachersRepository.getTeacherById(req.body.teacher_id);
    if (!teacher) {
      return res.sendStatus(404);
    }
    const course = await coursesRepository.changeTeacher(req.params.id, req.body.teacher_id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// POST /courses/:id/students
export async function addStudentToCourse(req, res) {
  try {
    if (!req.body.student_id) {
      return res.sendStatus(400);
    }
    const courseFound = await coursesRepository.courseExists(req.params.id);
    if (!courseFound) {
      return res.sendStatus(404);
    }
    const student = await studentsRepository.getStudentById(req.body.student_id);
    if (!student) {
      return res.sendStatus(404);
    }
    const enrollment = await coursesRepository.addStudentToCourse(req.params.id, req.body.student_id);
    if (enrollment) {
      res.status(201).json(enrollment);
    } else {
      res.sendStatus(409);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// DELETE /courses/:id/students/:studentId
export async function removeStudentFromCourse(req, res) {
  try {
    const removed = await coursesRepository.removeStudentFromCourse(req.params.id, req.params.studentId);
    if (removed) {
      res.status(200).send({ message: "Student removed from course" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
