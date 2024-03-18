const { app, db } = require("../setup.js");

app.post("/answers/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    const { questionId, name } = req.body;
    db.run("INSERT INTO Answers (quizId, questionId, name) VALUES (?, ?, ?)",
    [quizId, questionId, name], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(201).send({
            id: this.lastID,
            quizId: quizId,
            questionId: questionId,
            name: name
        });
    });
});

app.put("/answers/:answerId", (req, res) => {
    const answerId = req.params.answerId;
    const { questionId, name } = req.body;
    db.run("UPDATE Answers SET name = ? WHERE id = ?",
    [name, answerId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
        }
        res.status(200).send({
            id: answerId,
            questionId: questionId,
            name: name
        });
    });
});

app.delete("/answers/:answerId", (req, res) => {
    const answerId = req.params.answerId;
    db.run("DELETE FROM Answers WHERE id = ?",
    [answerId], function(err) {
        if (err) {
            res.status(500).send({ message: err.message });
            return
        }
        if (this.changes == 0) {
            res.status(404).send({ message: "Answer is not found" });
            return;
        }
        res.status(204).send();
    });
});
