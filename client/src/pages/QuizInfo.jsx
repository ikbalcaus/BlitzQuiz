import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Box, Typography, Input, Button } from '@mui/joy'

export default function QuizInfo() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quiz, setQuiz] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    
    useEffect(() => {
        fetch("http://localhost:8080/quizzes/" + quizId)
        .then(res => res.json())
        .then(data => setQuiz(data));
        fetch("http://localhost:8080/questions/" + quizId)
        .then(res => res.json())
        .then(data => setNumberOfQuestions(data.length));
    })

    return (
        <Card
            color="primary"
            variant="solid"
            sx={{
                width: "30%",
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                position: "relative",
                my: 6,
                left: "50%",
                transform: "translateX(-50%)",
                p: 3,
                boxShadow: "0 1px 15px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Typography
                level="h3"
                sx={{
                    color: "white",
                    textAlign: "center"
                }}    
            >{quiz.name}</Typography>
            <Typography
                level="h5"
                sx={{
                    wordWrap: "break-word",
                    mb: 1
                }}
            >{quiz.description}</Typography>
            <Input placeholder="Enter your nickname"/>
            <Typography level="h5">Duration: {quiz.duration} minutes</Typography>
            <Typography level="h5">Number of Questions: {numberOfQuestions}</Typography>
            <Button variant="soft">Start</Button>
            <Box sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: "center"
            }}>
                <Button
                    variant="soft"
                    onClick={() => navigate("/edit/" + quizId)}
                    sx={{
                        width: "35%",
                        minWidth: "100px"
                    }}
                >Edit</Button>
                <Button
                    variant="soft"
                    sx={{
                        width: "35%",
                        minWidth: "120px"
                    }}
                >See results</Button>
            </Box>
        </Card>
    )
}
