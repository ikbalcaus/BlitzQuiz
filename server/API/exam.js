const { app, db } = require("../setup.js");

app.get("/exam/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.all("SELECT id, name FROM Questions WHERE quizId = ?",
    [quizId], function(err, questions) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        const record = [];
        questions.forEach(question => {
            db.all("SELECT id, name FROM Answers WHERE questionId = ?",
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

app.post("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { nickname } = req.body;
    if (!nickname) {
        res.status(302).send({ message: "Nickname is required" });
        return;
    }
    const duration = (await getQuizData(quizId)).duration;
    setTimeout(() => {
        saveResultToDatabase(nickname, quizId, 0, duration);
    }, duration * 60000);
    res.status(201).send({
        quizId: quizId,
        nickname: nickname,
        duration: duration
    });
});

app.put("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { nickname } = req.body;
});

const getQuizData = (quizId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT name, description, duration FROM Quizzes WHERE id = ?",
        [quizId], function (err, record) {
            if (err) {
                reject(err);
                return;
            }
            resolve(record);
        });
    });
};

const getNumberOfQuestion = (quizId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT COUNT(id) AS count FROM Questions WHERE quizId = ?",
        [quizId], function (err, record) {
            if (err) {
                reject(err);
                return;
            }
            resolve(record["count"]);
        });
    });
}

const saveResultToDatabase = async (nickname, quizId, correctAnswers, duration) => {
    const score = correctAnswers / (await getNumberOfQuestion(quizId) || 1) * 100;
    db.run(`INSERT INTO Results (quizId, username, score, correctAnswers, duration) VALUES (?, ?, ?, ?, ?)`,
    [quizId, nickname, score, correctAnswers, duration], function(err) {
        if (err) throw err;
    });
};
