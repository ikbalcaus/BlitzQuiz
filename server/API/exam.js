const { app, db } = require("../setup.js");

let timers = [];
const findTimer = (quizId, nickname) => {
    for (let i = timers.length - 1; i >= 0; i--) {
        if (timers[i].quizId == quizId && timers[i].nickname == nickname) {
            return timers[i].timerId;
        }
    }
    return null;
}

app.get("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    db.all("SELECT nickname, correctAnswers, totalAnswers, duration, date FROM Results WHERE quizId = ? ORDER BY date DESC",
    [quizId], function(err, record) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.status(200).send(record);
    });
});

app.post("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { nickname } = req.body;
    let duration = 0;
    db.get("SELECT duration FROM Quizzes WHERE id = ?",
    [quizId], function(err, record) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        duration = record.duration;
    });
    if (!nickname) {
        res.status(302).send({ message: "Nickname is required" });
        return;
    }
    let record = [];
    db.all("SELECT id, name FROM Questions WHERE quizId = ?",
    [quizId], function(err, questions) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        questions.forEach(question => {
            db.all("SELECT id, name FROM Answers WHERE questionId = ?",
            [question.id], function(err, answers) {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                }
                record.push({
                    id: question.id,
                    name: question.name,
                    answers: answers.map(answer => ({ ...answer, isCorrect: 0 }))
                });
                if (record.length == questions.length) {
                    const timerId = setTimeout(() => {
                        saveResultToDatabase(quizId, nickname, 0, 0, "0")
                        .then(() => {
                            res.status(200).send({
                                nickname: nickname,
                                correctAnswers: correctAnswers,
                                totalAnswers: totalAnswers
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err.message });
                        });
                    }, duration * 60000);
                    timers.push({
                        "timerId": timerId,
                        "quizId": quizId,
                        "nickname": nickname
                    });
                    res.status(201).send(record);
                }
            });
        });
    });
});

app.put("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { nickname, userAnswers, duration } = req.body;
    const totalAnswers = userAnswers.length;
    let correctAnswers = 0;
    if (!nickname) {
        res.status(302).send({ message: "Nickname is required" });
        return;
    }
    let record = [];
    clearTimeout(findTimer(quizId, nickname));
    db.all("SELECT id FROM Questions WHERE quizId = ?",
    [quizId], function(err, questions) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
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
                    record.sort((a, b) => a.id - b.id);
                    for (let i = 0; i < totalAnswers; i++) {
                        record[i].answers.sort((a, b) => a.id - b.id);
                    }
                    userAnswers.sort((a, b) => a.id - b.id);
                    for (let i = 0; i < totalAnswers; i++) {
                        userAnswers[i].answers.sort((a, b) => a.id - b.id);
                    }
                    for (let i = 0; i < totalAnswers; i++) {
                        if (JSON.stringify(record[i].answers) == JSON.stringify(userAnswers[i].answers)) correctAnswers++;
                    }
                    saveResultToDatabase(quizId, nickname, correctAnswers, totalAnswers, duration)
                    .then(() => {
                        res.status(200).send({
                            nickname: nickname,
                            correctAnswers: correctAnswers,
                            totalAnswers: totalAnswers
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({ message: err.message });
                    });
                }
            });
        });
    });
});

const saveResultToDatabase = (quizId, nickname, correctAnswers, totalAnswers, duration) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO Results (quizId, nickname, correctAnswers, totalAnswers, duration) VALUES (?, ?, ?, ?, ?)`,
        [quizId, nickname, correctAnswers, totalAnswers, duration], function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
};
