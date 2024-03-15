import { useState, useEffect } from 'react';
import { Box, Input, IconButton } from '@mui/joy';
import { Add, Remove } from '@mui/icons-material';

export default function QuestionsPage() {
    const quizId = window.location.pathname.split("/")[2];
    const [newQuestion, setNewQuestion] = useState("");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/questions/" + quizId)
        .then(res => res.json())
        .then(data => setQuestions(data));
    }, []);

    const handleInputChange = (event) => {
        setNewQuestion(event.target.value);
    }

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

    const deleteQuestion = (questionId) => {
        fetch("http://localhost:8080/questions/" + questionId, {
            method: "DELETE"
        });
        setQuestions(questions.filter(question => question.id != questionId));
    }

    return (
        <Box sx={{
            width: "60%",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            position: "relative",
            mt: 3,
            left: "50%",
            transform: "translateX(-50%)",
        }}>
            <Box sx={{
                display: "flex",
                gap: 0.5,
                mb: 1
            }}>
                <Input
                    name="name"
                    value={newQuestion}
                    onChange={handleInputChange}
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
            {questions.map(question => (
                <Box key={question.id} sx={{
                    display: "flex",
                    gap: 0.5
                }}>
                    <Input
                        name={"name" + question.id}
                        value={question.name}
                        onChange={handleInputChange}
                        sx={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <IconButton
                        onClick={() => deleteQuestion(question.id)}
                        color="primary"
                        variant="solid"
                    ><Remove /></IconButton>
                </Box>
            ))}
        </Box>
    )
}
