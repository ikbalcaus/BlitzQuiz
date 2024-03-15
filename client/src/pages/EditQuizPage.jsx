import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Input, Textarea, Button } from '@mui/joy'

export default function EditQuizPage() {
    const id = window.location.pathname.split("/")[2];
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState({
        name: "",
        description: "",
        duration: 5,
        password: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/quizzes/" + id)
        .then(res => {
            if (!res.ok) {
                navigate("/");
            }
            return res.json();
        })
        .then(data => {
            setQuizData(data);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuizData({
            ...quizData,
            [name]: value
        });
    };

    const addQuiz = () => {
        fetch("http://localhost:8080/quizzes/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        })
        .then(res => res.json())
        .then(navigate("/"));
    }

    const deleteQuiz = () => {
        fetch("http://localhost:8080/quizzes/" + id, {
            method: "DELETE"
        })
        navigate("/");
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
                />
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 0.5
            }}>
                <Button onClick={addQuiz}>SUBMIT</Button>
                <Button
                    onClick={() => navigate("/edit/" + id + "/questions")}
                    color="neutral"
                    variant="soft"
                >EDIT QUESTIONS</Button>
                <Button
                    onClick={deleteQuiz}
                    color="danger"
                    variant="soft"
                >DELETE QUIZ</Button>
            </Box>
        </Box>
    )
}