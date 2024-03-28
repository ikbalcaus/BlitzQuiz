import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Box, Typography, Input, Button } from '@mui/joy'
import { GlobalContext } from '../index';

export default function QuizInfoPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quiz, setQuiz] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const { serverAddress, setNickname } = useContext(GlobalContext);

    useEffect(() => {
        fetch(serverAddress + "/quizzes/" + quizId)
        .then(res => res.json())
        .then(data => setQuiz(data));
        fetch(serverAddress + "/questions/" + quizId + "/count")
        .then(res => res.json())
        .then(data => setNumberOfQuestions(data.count));
    }, []);

    return (
        <Container sx={{
            my: 5,
            display: "flex",
            justifyContent: "center"
        }}>
            <Card
                color="primary"
                variant="solid"
                sx={{
                    width: "50%",
                    minWidth: "300px",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    my: 5,
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
                <Input
                    id="nickname-input"
                    placeholder="Enter your nickname"
                    autoComplete="off"
                    spellCheck="false"
                />
                <Typography level="h5">Duration: {quiz.duration} minutes</Typography>
                <Typography level="h5">Number of Questions: {numberOfQuestions}</Typography>
                <Button
                    variant="soft"
                    onClick={() => {
                        setNickname(document.getElementById("nickname-input").value);
                        navigate("/exam/" + quizId);
                    }}
                >Start</Button>
                <Box sx={{
                    display: "flex",
                    gap: 1.5,
                    justifyContent: "center"
                }}>
                    <Button
                        variant="soft"
                        onClick={() => navigate("/edit/" + quizId)}
                        sx={{ width: "40%" }}
                    >Edit</Button>
                    <Button
                        variant="soft"
                        onClick={() => navigate("/results/" + quizId)}
                        sx={{ width: "40%" }}
                    >View results</Button>
                </Box>
            </Card>
        </Container>
    )
}
