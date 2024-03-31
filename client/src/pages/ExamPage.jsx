import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Checkbox, Button, Modal, ModalDialog } from '@mui/joy'
import { GlobalContext } from '../index';

export default function ExamPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [data2, setQuizData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const { serverAddress, nickname } = useContext(GlobalContext);

    useEffect(() => {
        if (nickname) {
            Promise.all([
                fetch(serverAddress + "/questions/" + quizId + "/count"),
                fetch(serverAddress + "/quizzes/" + quizId),
                fetch(serverAddress + "/exam/" + quizId, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nickname: nickname })
                })
            ])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                const [data1, data2, data3] = data;
                if (data1.count == 0) {
                    navigate("/quiz/" + quizId);
                    return;
                }
                setQuizData(data2);
                setTimeLeft(data2.duration * 60);
                const intervalId = setInterval(() => {
                    setTimeLeft(prevState => prevState - 1);
                }, 1000);
                const timeoutId = setTimeout(() => {
                    setResult({
                        nickname: nickname,
                        correctAnswers: 0,
                        totalAnswers: 0,
                    });
                    setShowModal(true);
                }, data2.duration * 60000);
                setIntervalId(intervalId);
                setTimeoutId(timeoutId);
                setQuestions(data3);
            });
        }
        else navigate("/quiz/" + quizId);
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);
    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const markAnswer = (questionId, answerId) => {
        setQuestions(
            questions.map(question => question.id == questionId ? {
                ...question,
                answers: question.answers.map(answer =>
                    answer.id == answerId
                        ? { ...answer, isCorrect: (answer.isCorrect ? 0 : 1) }
                        : answer
                ),
            } : question
        ));
    }

    const finishQuiz = () => {
        fetch(serverAddress + "/exam/" + quizId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nickname: nickname,
                userAnswers: questions,
                duration: `${formatTime(data2.duration * 60 - timeLeft)} / ${formatTime(data2.duration * 60)}`
            })
        })
        .then(res => res.json())
        .then(data => {
            setShowModal(true);
            setResult(data);
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        });
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
            flexDirection: "column",
            position: "relative",
        }}>
            <Typography sx={{
                position: "absolute",
                left: "100%",
                ml: -13.5,
                top: 5
            }}>Timer: {formatTime(timeLeft)}</Typography>
            <Typography
                level="h2"
                sx={{ alignSelf: "center" }}
            >{data2.name}</Typography>
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
            <Modal open={showModal}>
                <ModalDialog>
                    <Typography
                        level="h3"
                        sx={{ alignSelf: "center" }}
                    >{nickname}</Typography>
                    <Typography>Your score is: <strong>{(result.correctAnswers && result.totalAnswers) ? (result.correctAnswers / result.totalAnswers * 100).toFixed() : 0}%</strong></Typography>
                    <Typography>You answered <strong>{result.correctAnswers}</strong> out of <strong>{result.totalAnswers}</strong> questions correctly</Typography>
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        my: 0.7,
                    }}>
                        <Button
                            onClick={() => navigate("/quiz/" + quizId)}
                            sx={{ width: "45%" }}
                        >Try again</Button>
                        <Button
                            onClick={() => navigate("/results/" + quizId)}
                            sx={{ width: "45%" }}
                        >View results</Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Container>
    )
}
