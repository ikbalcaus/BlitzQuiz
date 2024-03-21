const { app, db } = require("../setup.js");
let quizTimers = [];

app.get("/exam/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    db.all("SELECT * FROM Questions WHERE quizId = ?",
    [quizId], function(err, questions) {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        const record = [];
        questions.forEach(question => {
            db.all("SELECT id, quizId, questionId, name FROM Answers WHERE questionId = ?",
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
    if (quizTimers.some(timer => timer.nickname == nickname && timer.quizId == quizId)) {
        return res.send("Quiz already started");
    }
    try {
        const duration = (await getQuizData(quizId)).duration;
        quizTimers.push({
            nickname: nickname,
            quizId: quizId,
        });
        setTimeout(() => {
            const timerIndex = quizTimers.findIndex(timer => timer.nickname == nickname && timer.quizId == quizId);
            if (timerIndex != -1) {
                quizTimers.splice(timerIndex, 1);
                saveResultToDatabase(nickname, quizId, 0, duration);
            }
        }, duration * 1000);
        res.status(200).send("Quiz started");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.put("/exam/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    const { nickname, correctAnswers } = req.body;
    const duration = (await getQuizData(quizId)).duration;
    const timerIndex = quizTimers.findIndex(timer => timer.nickname == nickname && timer.quizId == quizId);
    if (timerIndex != -1) {
        clearTimeout(quizTimers[timerIndex].timer);
        quizTimers.splice(timerIndex, 1);
        console.log("Quiz timer stopped");
    }
    try {
        await saveResultToDatabase(nickname, quizId, correctAnswers, duration);
        res.status(200).send("Result saved");
    } catch (err) {
        res.status(400).send("Result not saved");
    }
});

const getQuizData = (quizId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Quizzes WHERE id = ?",
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
        db.get("SELECT COUNT(*) FROM Questions WHERE quizId = ?",
        [quizId], function (err, record) {
            if (err) {
                reject(err);
                return;
            }
            resolve(record["COUNT(*)"]);
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
