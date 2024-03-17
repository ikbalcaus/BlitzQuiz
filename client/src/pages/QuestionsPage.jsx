import { useState, useEffect } from 'react';
import { Box, Input, IconButton, Container, Divider } from '@mui/joy';
import QuestionInput from '../components/QuestionInput.jsx';
import AnswerInput from '../components/AnswerInput.jsx';
import { Add } from '@mui/icons-material';

export default function QuestionsPage() {
    const quizId = window.location.pathname.split("/")[2];
    const [newQuestion, setNewQuestion] = useState("");
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
            body: JSON.stringify({ name: newQuestion })
        })
        .then(res => res.json())
        .then(data => setQuestions([...questions, data]));
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
                left: "50%",
                transform: "translateX(-50%)",
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 0.5
                }}>
                    <Input
                        name="name"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        sx={{ width: "100%" }}
                        placeholder="Enter new question"
                        autoComplete="off"
                    />
                    <IconButton
                        color="primary"
                        variant="solid"
                        onClick={addQuestion}
                    ><Add /></IconButton>
                </Box>
                <Divider />
                {questions.map(question => (
                    <Box key={question.id}>
                        <QuestionInput
                            question={question}
                            updateQuestionDOM={(data) => setQuestions(questions.map(question => question.id == data.id ? { ...question, name: data.name } : question))}
                            deleteQuestionDOM={(questionId) => setQuestions(questions.filter(question => question.id != questionId))}
                        />
                        <AnswerInput />
                    </Box>
                ))}
            </Box>
        </Container>
    )
}
