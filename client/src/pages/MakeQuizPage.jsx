import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Input, Textarea, Button } from '@mui/joy'

export default function MakeQuizPage() {
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState({
        name: "",
        description: "",
        duration: 5,
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuizData(({
            ...quizData,
            [name]: value
        }));
    };

    const formSubmit = () => {
        fetch("http://localhost:8080/quizzes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        })
        .then(res => res.json())
        .then(navigate("/"))
    }

    return (
        <Box sx={{
            width: "40%",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            position: "relative",
            mt: 6,
            left: "50%",
            transform: "translateX(-50%)",
        }}>
            <Box>
                <Typography level="h5">Quiz name:*</Typography>
                <Input
                    name="name"
                    value={quizData.name}
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                />
            </Box>
            <Box>
                <Typography level="h5">Quiz description:</Typography>
                <Textarea
                    name="description"
                    value={quizData.description}
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
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                />
            </Box>
            <Box>
                <Typography level="h5">Password:</Typography>
                <Input
                    name="password"
                    type="password"
                    value={quizData.password}
                    onChange={handleInputChange}
                    sx={{ boxShadow: "none" }}
                    autoComplete="off"
                />
            </Box>
            <Button
                sx={{ mt: 0.5 }}
                onClick={formSubmit}
            >SUBMIT</Button>
        </Box>
    )
}
