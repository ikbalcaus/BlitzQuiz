import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Checkbox, Button } from '@mui/joy'
import { GlobalContext } from '../index';

export default function ExamPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);
    const { nickname } = useContext(GlobalContext);

    useEffect(() => {
        if (nickname) {
            fetch("http://localhost:8080/quizzes/" + quizId)
            .then(res => res.json())
            .then(data => { setQuizName(data.name) });
            fetch("http://localhost:8080/exam/" + quizId)
            .then(res => res.json())
            .then(data => { setQuestions(data) });
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

    const markAnswer = (questionId, answerId) => {
        setQuestions(
            questions.map(question => question.id == questionId ? {
                ...question,
                answers: question.answers.map(answer =>
                    answer.id == answerId
                        ? { ...answer, isCorrect: (answer.isCorrect ? 0 : 1) }
                        : answer
                ),
            } : question )
        );
    }

    const finishQuiz = () => {
        fetch("http://localhost:8080/exam/" + quizId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nickname: nickname,
                userAnswers: questions,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <Container sx={{
            my: 5,
            width: "80%",
            bgcolor: "background.level1",
            py: 2,
            px: 4,
            boxShadow: "0 1px 7px rgba(0, 0, 0, 0.25)",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column"
        }}>
            <Typography
                level="h2"
                sx={{ alignSelf: "center" }}
            >{quizName}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2
            }}>
                {questions.map((question) => (
                    <Box key={question.id}>
                        <Typography sx={{
                            mb: 0.8,
                            fontSize: "1.1rem"
                        }}>{question.name}</Typography>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            {question.answers.map(answer => (
                                <Box key={answer.id} sx={{
                                    display: "flex",
                                    alignItems: "end",
                                    gap: 2,
                                    ml: 3
                                }}>
                                    <Checkbox onClick={() => markAnswer(question.id, answer.id)} />
                                    <Typography>{answer.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Button
                onClick={finishQuiz}
                sx={{
                    width: "250px",
                    alignSelf: "center",
                    mt: 4,
                    mb: 2,
                }}
            >Submit</Button>
        </Container>
    )
}
