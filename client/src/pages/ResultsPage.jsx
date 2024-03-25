import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from '@mui/joy';

export default function ResultsPage() {
    const quizId = window.location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/exam/" + quizId)
        .then(res => res.json())
        .then(data => setResults(data))
    }, []);

    return (
        <Container sx={{
            mt: 5,
            mb: 7.5
        }}>
            <Table sx={{
                "& tr > *:not(:first-child)": { textAlign: "center" },
                "& thead th:nth-child(1)": { width: "0px" }
            }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Correct answers</th>
                        <th>Score</th>
                        <th>Duration</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{result.nickname}</td>
                            <td>{result.correctAnswers}/{result.totalAnswers}</td>
                            <td>{(result.correctAnswers && result.totalAnswers) ? (result.correctAnswers / result.totalAnswers * 100).toFixed() : 0}%</td>
                            <td>{result.duration}</td>
                            <td>{result.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 20,
                    width: 200
                }}
                onClick={() => navigate("/quiz/" + quizId)}
            >Previous page</Button>
        </Container>
    )
}
