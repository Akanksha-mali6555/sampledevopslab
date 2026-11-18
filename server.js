
const express = require('express');

const app = express();

app.use(express.json());

// Sample student data
const students = [
    { id: 1, name: "Akanksha", department: "Computer Engineering" },
    { id: 2, name: "Sonali", department: "Computer Engineering" }
];

// Home API
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to REST API Application"
    });
});

// GET: Retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET: Retrieve student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST: Add a student
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        department: req.body.department
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Start server
if (require.main === module) {
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;