const { app, db } = require("../setup.js");

app.get("/questions/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.all("SELECT id, name FROM Questions WHERE quizId = ?",
    [quizId], function(err, questions) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        let record = [];
        questions.forEach(question => {
            db.all("SELECT id, name, isCorrect FROM Answers WHERE questionId = ?",
            [question.id], function(err, answers) {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                }
                record.push({
                    id: question.id,
                    quizId: quizId,
                    name: question.name,
                    answers: answers
                });
                if (record.length == questions.length) {
                    res.status(200).send(record);
                }
            });
        });
    });
});

app.post("/questions/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    const { name } = req.body;
    db.run("INSERT INTO Questions (quizId, name) VALUES (?, ?)",
    [quizId, name], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(201).send({
            id: this.lastID,
            quizId: quizId,
            name: name,
            answers: []
        });
    });
});

app.put("/questions/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const { name } = req.body;
    db.run("UPDATE Questions SET name = ? WHERE id = ?",
    [name, questionId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
        }
        res.status(200).send({
            id: questionId,
            name: name
        });
    });
});

app.delete("/questions/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    db.run("DELETE FROM Questions WHERE id = ?",
    [questionId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(204).send();
    });
});

app.get("/questions/:quizId/count", (req, res) => {
    const quizId = req.params.quizId;
    db.get("SELECT COUNT(id) AS count FROM Questions WHERE quizId = ?",
    [quizId], function(err, record) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(200).send(record);
    });
});
