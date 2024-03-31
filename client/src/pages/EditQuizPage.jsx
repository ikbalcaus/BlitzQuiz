import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Input, Textarea, Button } from '@mui/joy'
import { GlobalContext } from '../index';

export default function EditQuizPage() {
    const navigate = useNavigate();
    const quizId = window.location.pathname.split("/")[2];
    const [quizData, setQuizData] = useState({
        name: "",
        description: "",
        duration: 5
    });
    const { serverAddress } = useContext(GlobalContext);

    useEffect(() => {
        fetch(serverAddress + "/quizzes/" + quizId)
        .then(res => res.json())
        .then(data => setQuizData(data));
    }, []);

    const updateQuiz = () => {
        fetch(serverAddress + "/quizzes/" + quizId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        })
        .then(res => res.json())
        .then(navigate("/quiz/" + quizId));
    }

    const deleteQuiz = () => {
        fetch(serverAddress + "/quizzes/" + quizId, {
            method: "DELETE"
        })
        navigate("/");
    }

    return (
        <Container sx={{
            width: "50%",
            minWidth: "300px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            my: 5
        }}>
            <Box>
                <Typography level="h5">Quiz name:*</Typography>
                <Input
                    value={quizData.name}
                    onChange={(event) => setQuizData({ ...quizData, name: event.target.value })}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                    spellCheck="false"
                />
            </Box>
            <Box>
                <Typography level="h5">Quiz description:</Typography>
                <Textarea
                    value={quizData.description || ""}
                    onChange={(event) => setQuizData({ ...quizData, description: event.target.value })}
                    minRows={3}
                    maxRows={6}
                    autoComplete="off"
                    sx={{ boxShadow: "none" }}
                />
            </Box>
            <Box>
                <Typography level="h5">Duration in minutes:*</Typography>
                <Input
                    type="number"
                    value={quizData.duration}
                    onChange={(event) => setQuizData({ ...quizData, duration: event.target.value })}
                    min={1}
                    max={120}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                    spellCheck="false"
                />
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 1
            }}>
                <Button onClick={updateQuiz}>SUBMIT</Button>
                <Button
                    onClick={() => {
                        updateQuiz();
                        navigate("/edit/" + quizId + "/questions");
                    }}
                    color="neutral"
                    variant="soft"
                >EDIT QUESTIONS</Button>
                <Button
                    onClick={deleteQuiz}
                    color="danger"
                    variant="soft"
                >DELETE QUIZ</Button>
            </Box>
        </Container>
    )
}
