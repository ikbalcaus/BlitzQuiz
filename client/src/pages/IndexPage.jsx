import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../index';
import { Container, Card, Typography, CardContent } from '@mui/joy';

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
        <Container sx={{
            my: 5,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3
        }}>
                {quizzes.map(quiz => (
                    <Card key={quiz.id} color="neutral" variant="soft"
                        onClick={() => navigate("/quiz/" + quiz.id)}
                        sx={{
                            width: 225,
                            minHeight: 140,
                            cursor: "pointer",
                            boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
                            wordWrap: "break-word",
                            py: 2,
                            px: 2.5,
                            ":hover": {
                                bgcolor: "background.level2"
                            }
                        }}
                    >
                        <CardContent>
                            <Typography level="title-lg">{quiz.name}</Typography>
                            <Typography>{quiz.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
        </Container>
    );
}
