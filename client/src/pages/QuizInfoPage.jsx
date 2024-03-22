import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Box, Typography, Input, Button } from '@mui/joy'
import { GlobalContext } from '../index';

export default function QuizInfoPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quiz, setQuiz] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const { setNickname } = useContext(GlobalContext);

    useEffect(() => {
        fetch("http://localhost:8080/quizzes/" + quizId)
        .then(res => res.json())
        .then(data => setQuiz(data));
        fetch("http://localhost:8080/questions/" + quizId + "/count")
        .then(res => res.json())
        .then(data => setNumberOfQuestions(data.count));
    }, []);

    const startQuiz = () => {
        setNickname(document.getElementById("nickname-input").value);
        navigate("/exam/" + quizId);
    }

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
                my: 5,
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
            <Input
                id="nickname-input"
                placeholder="Enter your nickname"
                autoComplete="off"
            />
            <Typography level="h5">Duration: {quiz.duration} minutes</Typography>
            <Typography level="h5">Number of Questions: {numberOfQuestions}</Typography>
            <Button
                variant="soft"
                onClick={startQuiz}
            >Start</Button>
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
