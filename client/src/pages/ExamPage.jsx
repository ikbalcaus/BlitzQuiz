import { useState, useContext, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Checkbox, Button } from '@mui/joy'
import { GlobalContext } from '../index';

export default function ExamPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);
    const { nickname } = useContext(GlobalContext);

    useLayoutEffect(() => {
        if (nickname) {
            fetch("http://localhost:8080/exam/" + quizId)
            .then(res => res.json())
            .then(data => setQuestions(data));
            fetch("http://localhost:8080/exam/" + quizId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nickname: nickname })
            })
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    navigate("/quiz/" + quizId);
                }, data.duration * 60000);
            });
        }
        else navigate("/quiz/" + quizId);
    }, []);

    const finishQuiz = () => {
        fetch("http://localhost:8080/exam/" + quizId, {
            method: "PUT"
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <Container sx={{
            my: 5,
            display: "flex",
            flexDirection: "column",
            gap: 3.5,
            width: "80%",
            bgcolor: "background.level1",
            py: 3,
            px: 4,
            boxShadow: "0 1px 7px rgba(0, 0, 0, 0.25)",
            borderRadius: 6
        }}>
            {questions.map((question, index) => (
                <Box key={question.id} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                }}>
                    <Typography sx={{
                        mb: 0.2,
                        fontWeight: 500,
                        fontSize: "1.1rem"
                    }}>{index + 1}. {question.name}</Typography>
                    {question.answers.map(answer => (
                        <Box key={answer.id} sx={{
                            display: "flex",
                            alignItems: "end",
                            gap: 2,
                            ml: 1
                        }}>
                            <Checkbox
                                
                            />
                            <Typography>{answer.name}</Typography>
                        </Box>
                    ))}
                </Box>
            ))}
            <Button
                onClick={finishQuiz}
                sx={{
                    width: "250px",
                    alignSelf: "center",
                    mb: 0.5
                }}
            >Submit</Button>
        </Container>
    )
}
