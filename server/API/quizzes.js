const { app, db } = require("../setup.js");

app.get("/quizzes", (req, res) => {
    const searchQuery = req.query.search;
    db.all("SELECT * FROM Quizzes", function (err, record) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        if (searchQuery) {
            record = record.filter(quiz => quiz.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        res.status(200).send(record);
    });
});

app.get("/quizzes/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.get("SELECT * FROM Quizzes WHERE id = ?", [quizId], function (err, record) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        if (!record) {
            res.status(404).send({ message: "Quiz is not found" });
            return;
        }
        res.status(200).send(record);
    });
});

app.post("/quizzes", (req, res) => {
    const { name, description, duration, password } = req.body;
    db.run("INSERT INTO Quizzes (name, description, duration, password) VALUES (?, ?, ?, ?)", 
    [name, description, duration, password], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(201).send({
            id: this.lastID,
            name: name,
            description: description,
            numberOfQuestions: 0,
            duration: duration,
            password: password
        });
    });
});

app.put("/quizzes/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    const { name, description, numberOfQuestions, duration, password } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.run("UPDATE Quizzes SET name = ?, description = ?, numberOfQuestions = ?, duration = ?, password = ?, date = ? WHERE id = ?", 
    [name, description, numberOfQuestions, duration, password, date, quizId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        if (this.changes == 0) {
            res.status(404).send({ message: "Quiz is not found" });
            return;
        }
        res.status(200).send({
            id: quizId,
            name: name,
            description: description,
            numberOfQuestions: numberOfQuestions,
            duration: duration,
            password: password
        });
    });
});

app.delete("/quizzes/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.run("DELETE FROM Quizzes WHERE id = ?", [quizId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        if (this.changes == 0) {
            res.status(404).send({ message: "Quiz is not found" });
            return;
        }
        res.status(204).send();
    });
});
