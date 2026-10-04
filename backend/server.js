const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Student = require("./models/Student");

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// =========================
// GET - All Students
// =========================
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        console.error("GET Error:", error);

        res.status(500).json({
            message: "Error fetching students"
        });
    }
});

// =========================
// POST - Add Student
// =========================
app.post("/api/students", async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            course: req.body.course
        });

        const savedStudent = await student.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        console.error("POST Error:", error);

        res.status(500).json({
            message: "Error creating student"
        });
    }
});

// =========================
// PUT - Update Student
// =========================
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                course: req.body.course
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("PUT Error:", error);

        res.status(500).json({
            message: "Error updating student"
        });
    }
});

// =========================
// DELETE - Delete Student
// =========================
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: student
        });
    } catch (error) {
        console.error("DELETE Error:", error);

        res.status(500).json({
            message: "Error deleting student"
        });
    }
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});