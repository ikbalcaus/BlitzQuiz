import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../index';
import { Container, Box, Card, Typography, CardContent } from '@mui/joy';

export default function IndexPage() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const { search } = useContext(GlobalContext);

    useEffect(() => {
        fetch("http://localhost:8080/quizzes?search=" + search)
        .then(res => res.json())
        .then(data => setQuizzes(data));
    }, [search]);

    return (
        <Container sx={{ my: 4 }}>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1.2
            }}>
                {quizzes.map(quiz => (
                    <Card key={quiz.id}
                    onClick={() => navigate("/quiz/" + quiz.id)}
                    sx={{
                        width: 300,
                        minHeight: 50,
                        cursor: "pointer",
                        borderColor: "#cdd7e1",
                        wordWrap: "break-word",
                        ":hover": {
                            bgcolor: "#f0f4f8"
                        }
                    }}>
                        <CardContent>
                            <Typography level="title-lg">{quiz.name}</Typography>
                            <Typography>{quiz.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
