import { useState, useEffect } from 'react';
import { Box, Input, IconButton, Container, Button } from '@mui/joy';
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
        .then(data => { setQuestions(data.map(question => ({ ...question, isExpanded: false }))) });
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
                transform: "translateX(-50%)"
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 0.5,
                    mb: 0.5
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
                            <AnswerInput />
                        }
                    </Box>
                ))}
            </Box>
        </Container>
    )
}
