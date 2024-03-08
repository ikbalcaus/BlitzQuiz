const fs = require("fs");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.sqlite3");

if(!fs.existsSync("database.sqlite3")) {

  db.run(`CREATE TABLE Quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    numberOfQuestions INTEGER NOT NULL,
    duration INTEGER NOT NULL DEFAULT 5,
    password TEXT,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE Results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quizId INTEGER,
    username TEXT NOT NULL,
    score INTEGER NOT NULL,
    correctAnswers TEXT NOT NULL,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER NOT NULL,
    FOREIGN KEY (quizId) REFERENCES Quizzes(id)
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
  
}

module.exports = db;
