import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Input, Textarea, Button } from '@mui/joy'
import { GlobalContext } from '../index';
import { PowerInputOutlined } from '@mui/icons-material';

export default function MakeQuizPage() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        name: "",
        description: "",
        duration: 5
    });
    const { serverAddress } = useContext(GlobalContext);

    const makeQuiz = () => {
        fetch(serverAddress + "/quizzes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        })
        .then(res => res.json())
        .then(data => navigate("/edit/" + data.id + "/questions"));
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
                    value={quizData.description}
                    onChange={(event) => setQuizData({ ...quizData, description: event.target.value })}
                    minRows={3}
                    maxRows={6}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
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
            <Button
                onClick={makeQuiz}
                sx={{ mt: 1 }}
            >SUBMIT</Button>
        </Container>
    )
}
