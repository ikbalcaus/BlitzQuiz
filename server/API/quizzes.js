const { app, db } = require("../setup.js");

app.get("/quizzes", (req, res) => {
    db.all("SELECT * FROM Quizzes", (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(record);
    });
});

app.get("/quizzes/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM Quizzes WHERE id = ?", [id], (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!record) {
            res.status(404).json({ message: "Quiz is not found" });
            return;
        }
        res.status(200).json(record);
    });
});

app.post("/quizzes", (req, res) => {
    const { name, description, numberOfQuestions, duration, password } = req.body;
    db.run("INSERT INTO Quizzes (name, description, numberOfQuestions, duration, password) VALUES (?, ?, ?, ?, ?)", 
    [name, description, numberOfQuestions, duration, password], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(204).json();
    });
});

app.put("/quizzes/:id", (req, res) => {
    const id = req.params.id;
    const { name, description, numberOfQuestions, duration, password } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.run("UPDATE Quizzes SET name = ?, description = ?, numberOfQuestions = ?, duration = ?, password = ?, date = ? WHERE id = ?", 
    [name, description, numberOfQuestions, duration, password, date, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes == 0) {
            res.status(404).json({ message: "Quiz is not found" });
            return;
        }
        res.status(204).json();
    });
});

app.delete("/quizzes/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM Quizzes WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes == 0) {
            res.status(404).json({ message: "Quiz is not found" });
            return;
        }
        res.status(204).json();
    });
});

module.exports = app;
