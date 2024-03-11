import { useState, useEffect } from "react";
import { Container, Box, Card, Typography, CardContent } from "@mui/joy";

export default function IndexPage() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/quizzes")
        .then(res => res.json())
        .then(data => setQuizzes(data))
        .catch(err => console.log(err));
    }, []);

    return (
        <Container sx={{ my: 2.5 }}>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1.2
            }}>
                { quizzes.map(quiz => (
                    <Card key={ quiz.id } sx={{
                        width: 300,
                        cursor: "pointer",
                        borderColor: "#e9e9e9",
                        ":hover": {
                            backgroundColor: "#f0f4f8"
                        }
                    }}>
                        <CardContent>
                            <Typography level="title-lg">{ quiz.name }</Typography>
                            <Typography>{ quiz.description }</Typography>
                        </CardContent>
                    </Card>
                )) }
            </Box>
        </Container>
    );
}
