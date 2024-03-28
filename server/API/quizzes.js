const { app, db } = require("../setup.js");

app.get("/quizzes", (req, res) => {
    const searchQuery = req.query.search;
    db.all("SELECT id, name, description, duration FROM Quizzes", function(err, record) {
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
    db.get("SELECT name, description, duration FROM Quizzes WHERE id = ?",
    [quizId], function(err, record) {
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
    const { name, description, duration } = req.body;
    if (name == "") {
        res.status(400).send({ message: "Name is required" });
        return;
    }
    if (duration < 1 || duration > 120) {
        res.status(400).send({ message: "Duration must be between 1 and 120 minutes" });
        return;
    }
    db.run("INSERT INTO Quizzes (name, description, duration) VALUES (?, ?, ?)", 
    [name, description, duration], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(201).send({
            id: this.lastID,
            name: name,
            description: description,
            duration: duration
        });
    });
});

app.put("/quizzes/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    const { name, description, duration } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    if (name == "") {
        res.status(400).send({ message: "Name is required" });
        return;
    }
    if (duration < 1 || duration > 120) {
        res.status(400).send({ message: "Duration must be between 1 and 120 minutes" });
        return;
    }
    db.run("UPDATE Quizzes SET name = ?, description = ?, duration = ?, date = ? WHERE id = ?", 
    [name, description, duration, date, quizId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(200).send({
            id: quizId,
            name: name,
            description: description,
            duration: duration
        });
    });
});

app.delete("/quizzes/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.run("DELETE FROM Quizzes WHERE id = ?",
    [quizId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(204).send();
    });
});
