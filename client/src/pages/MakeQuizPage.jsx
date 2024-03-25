import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Input, Textarea, Button } from '@mui/joy'

export default function MakeQuizPage() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({ duration: 5 });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuizData(({
            ...quizData,
            [name]: value
        }));
    };

    const makeQuiz = () => {
        fetch("http://localhost:8080/quizzes", {
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
        <Box sx={{
            width: "40%",
            minWidth: "300px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            position: "relative",
            my: 5,
            left: "50%",
            transform: "translateX(-50%)",
        }}>
            <Box>
                <Typography level="h5">Quiz name:*</Typography>
                <Input
                    name="name"
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                    spellCheck="false"
                />
            </Box>
            <Box>
                <Typography level="h5">Quiz description:</Typography>
                <Textarea
                    name="description"
                    onChange={handleInputChange}
                    minRows={3}
                    maxRows={6}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                />
            </Box>
            <Box>
                <Typography level="h5">Duration in minutes:*</Typography>
                <Input
                    name="duration"
                    type="number"
                    value={quizData.duration}
                    min={1}
                    max={120}
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                    spellCheck="false"
                />
            </Box>
            <Box>
                <Typography level="h5">Password:</Typography>
                <Input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                />
            </Box>
            <Button
                sx={{ mt: 0.5 }}
                onClick={makeQuiz}
            >SUBMIT</Button>
        </Box>
    )
}
