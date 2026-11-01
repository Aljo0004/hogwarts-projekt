import * as teachersRepository from "../repositories/teachers.repository.js";

// GET /teachers
export async function getAllTeachers(req, res) {
  try {
    const allTeachers = await teachersRepository.getAllTeachers();
    res.status(200).json(allTeachers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// GET /teachers/:id
export async function getTeacherById(req, res) {
  try {
    const teacher = await teachersRepository.getTeacherById(req.params.id);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// POST /teachers
export async function createTeacher(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const teacher = await teachersRepository.createTeacher(req.body.name, req.body.house_id);
    res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// PUT /teachers/:id
export async function updateTeacher(req, res) {
  try {
    if (!req.body.name) {
      return res.sendStatus(400);
    }
    const teacher = await teachersRepository.updateTeacher(req.params.id, req.body.name, req.body.house_id);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// DELETE /teachers/:id
export async function deleteTeacher(req, res) {
  try {
    const deleted = await teachersRepository.deleteTeacher(req.params.id);
    if (deleted) {
      res.status(200).send({ message: "Teacher deleted" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
