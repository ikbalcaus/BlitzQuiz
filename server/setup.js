const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const fs = require("fs");

const app = express();
app.use(express.json(), cors());
const db = new sqlite3.Database("database.sqlite3");

if (!fs.existsSync("database.sqlite3")) {
  db.run(`CREATE TABLE Quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    duration INTEGER NOT NULL DEFAULT 5,
    password TEXT,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE Questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quizId INTEGER,
    name TEXT NOT NULL,
    FOREIGN KEY (quizId) REFERENCES Quizzes(id)
  )`);
  db.run(`CREATE TABLE Answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quizId INTEGER,
    questionId INTEGER,
    name TEXT NOT NULL,
    isCorrect INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (quizId) REFERENCES Quizzes(id),
    FOREIGN KEY (questionId) REFERENCES Questions(id)
  )`);
  db.run(`CREATE TABLE Results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quizId INTEGER,
    nickname TEXT NOT NULL,
    correctAnswers INTEGER NOT NULL,
    totalAnswers INTEGER NOT NULL,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration TEXT NOT NULL,
    FOREIGN KEY (quizId) REFERENCES Quizzes(id)
  )`);
  console.log("Database created");
}

module.exports = { app, db };
