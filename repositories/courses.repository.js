import { pool } from "../db.js";

// SELECT alle courses
export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses");
  return result.rows;
}

// SELECT course via id + teacher og students
export async function getCourseById(id) {

  const result = await pool.query("SELECT courses.id, courses.name, courses.teacher_id, teachers.name AS teacher_name " + "FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.id " + "WHERE courses.id = $1", [id]);
  if (result.rowCount === 0) {
    return null;
  }

  const students = await pool.query("SELECT students.id, students.name " + "FROM course_students JOIN students ON course_students.student_id = students.id " + "WHERE course_students.course_id = $1", [id]);

  const course = result.rows[0];
  course.students = students.rows;
  return course;
}

// SELECT findes course
export async function courseExists(id) {
  const result = await pool.query("SELECT id FROM courses WHERE id = $1", [id]);
  return result.rowCount > 0;
}

// INSERT course
export async function createCourse(name, teacherId) {
  const result = await pool.query("INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *", [name, teacherId]);
  return result.rows[0];
}

// UPDATE course navn
export async function updateCourse(id, name) {
  const result = await pool.query("UPDATE courses SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}

// DELETE course
export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);
  return result.rowCount > 0;
}

// UPDATE teacher på course
export async function changeTeacher(courseId, teacherId) {
  const result = await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *", [teacherId, courseId]);
  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}

// INSERT student på course
export async function addStudentToCourse(courseId, studentId) {
  try {
    const result = await pool.query("INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *", [courseId, studentId]);
    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      return null;
    }
    throw error;
  }
}

// DELETE student fra course
export async function removeStudentFromCourse(courseId, studentId) {
  const result = await pool.query("DELETE FROM course_students WHERE course_id = $1 AND student_id = $2", [courseId, studentId]);
  return result.rowCount > 0;
}
