import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, IconButton, Container, Button } from '@mui/joy';
import { Add } from '@mui/icons-material';
import QuestionInput from '../components/QuestionInput.jsx';
import AnswerInput from '../components/AnswerInput.jsx';

export default function QuestionsPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/questions/" + quizId)
        .then(res => res.json())
        .then(data => setQuestions(data));
    }, []);

    const addQuestion = () => {
        fetch("http://localhost:8080/questions/" + quizId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: document.getElementById("add-question-input").value })
        })
        .then(res => res.json())
        .then(data => {
            setQuestions([...questions, data]);
            document.getElementById("add-question-input").value = "";
            document.getElementById("add-question-input").focus();
        });
    }

    const addAnswer = (questionId) => {
        fetch("http://localhost:8080/answers/" + quizId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: questionId,
                name: document.getElementById("add-answer-input-" + questionId).value
            })
        })
        .then(res => res.json())
        .then(data => {
            setQuestions(questions.map(question => question.id == questionId ? { ...question, answers: [...question.answers, data] } : question));
            document.getElementById("add-answer-input-" + questionId).value = "";
            document.getElementById("add-answer-input-" + questionId).focus();
        });
    }

    return (
        <Container>
            <Box sx={{
                width: "80%",
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "relative",
                mt: 4,
                mb: 9,
                left: "50%",
                transform: "translateX(-50%)"
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 0.5,
                    mb: 0.5
                }}>
                    <Input
                        id="add-question-input"
                        placeholder="Enter new question"
                        sx={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <IconButton
                        color="primary"
                        variant="solid"
                        onClick={addQuestion}
                    ><Add /></IconButton>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: 1
                }}>
                    <Button
                        variant="soft"
                        onClick={() => setQuestions(questions.map(question => ({ ...question, isExpanded: false })))}
                    >Collapse all</Button>
                    <Button
                        variant="soft"
                        onClick={() => setQuestions(questions.map(question => ({ ...question, isExpanded: true })))}
                    >Expand all</Button>
                </Box>
                {questions.map(question => (
                    <Box key={question.id}>
                        <QuestionInput
                            question={question}
                            updateQuestionDOM={(data) => setQuestions(questions.map(question => question.id == data.id ? { ...question, name: data.name } : question))}
                            deleteQuestionDOM={(questionId) => setQuestions(questions.filter(question => question.id != questionId))}
                            onExpand={(questionId) => setQuestions(questions.map(question => question.id == questionId ? { ...question, isExpanded: !question.isExpanded } : question))}
                        />
                        {question.isExpanded &&
                            <Box sx={{ mt: 0.1 }}>
                                <Box sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    width: "80%",
                                    mx: "auto"
                                }}>
                                    <Input sx={{
                                        width: "100%",
                                        borderTop: 0
                                    }}
                                        id={"add-answer-input-" + question.id}
                                        placeholder="Enter new answer"
                                        autoComplete="off"
                                    />
                                    <IconButton
                                        variant="soft"
                                        onClick={() => addAnswer(question.id)}
                                    ><Add /></IconButton>
                                </Box>
                                {question.answers.map(answer =>
                                    <AnswerInput key={answer.id}
                                        answer={answer}
                                        questionId={question.id}
                                        updateAnswerDOM={(data) => setQuestions(questions.map(question => question.id == data.questionId ? { ...question, answers: question.answers.map(answer => answer.id == data.id ? data : answer) } : question))}
                                        deleteAnswerDOM={(answerId) => setQuestions(questions.map(question => ({ ...question, answers: question.answers.filter(answer => answer.id != answerId) })))}
                                    />
                                )}
                            </Box>
                        }
                    </Box>
                ))}
            </Box>
            <Button
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 20,
                    width: 200
                }}
                onClick={() => navigate("/edit/" + quizId)}
            >Previous page</Button>
        </Container>
    )
}
