import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../index";
import { Container, Box, Card, Typography, CardContent } from "@mui/joy";

export default function IndexPage() {
    const [quizzes, setQuizzes] = useState([]);
    const { search } = useContext(SearchContext);

    useEffect(() => {
        fetch("http://localhost:8080/quizzes?search=" + search)
        .then(res => res.json())
        .then(data => setQuizzes(data));
    }, [search]);

    return (
        <Container sx={{ my: 3 }}>
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
                        borderColor: "#cdd7e1",
                        ":hover": {
                            bgcolor: "#f0f4f8"
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
