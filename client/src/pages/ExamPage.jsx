import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Checkbox, Button } from '@mui/joy'

export default function ExamPage() {
    const quizId = window.location.pathname.split("/")[2];
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/exam/" + quizId)
        .then(res => res.json())
        .then(data => setQuestions(data));
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
            my: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3.5,
            width: "80%",
            bgcolor: "background.level1",
            py: 3,
            px: 4,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
            borderRadius: 6
        }}>
            {questions.map((question, index) => (
                <Box key={question.id} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.8
                }}>
                    <Typography sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: 1.1
                    }}>{index + 1}. {question.name}</Typography>
                    {question.answers.map(answer => (
                        <Box key={answer.id} sx={{
                            display: "flex",
                            alignItems: "end",
                            gap: 2,
                            ml: 2.5
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
