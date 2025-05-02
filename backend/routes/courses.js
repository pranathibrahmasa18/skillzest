const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Faculty adds a course
router.post("/add", (req, res) => {
    const { course_name, faculty_id } = req.body;
    const sql = "INSERT INTO courses (course_name, faculty_id) VALUES (?, ?)";
    
    db.query(sql, [course_name, faculty_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Course added!", courseId: result.insertId });
    });
});

// Student fetches courses
router.get("/", (req, res) => {
    const sql = "SELECT * FROM courses";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;