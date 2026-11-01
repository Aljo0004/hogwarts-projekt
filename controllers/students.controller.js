import * as studentsRepository from "../repositories/students.repository.js";

// GET /students
export async function getAllStudents(req, res) {
  try {
    const allStudents = await studentsRepository.getAllStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// GET /students/:id
export async function getStudentById(req, res) {
  try {
    const student = await studentsRepository.getStudentById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// POST /students
export async function createStudent(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const student = await studentsRepository.createStudent(req.body.name, req.body.year, req.body.house_id);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// PUT /students/:id
export async function updateStudent(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const student = await studentsRepository.updateStudent(req.params.id, req.body.name, req.body.year, req.body.house_id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// DELETE /students/:id
export async function deleteStudent(req, res) {
  try {
    const deleted = await studentsRepository.deleteStudent(req.params.id);
    if (deleted) {
      res.status(200).send({ message: "Student deleted" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
