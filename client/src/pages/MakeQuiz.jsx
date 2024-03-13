import { Container, Box, Typography, Input, Textarea, Button } from '@mui/joy'

export default function MakeQuiz() {
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Box sx={{
                my: 3,
                width: "40%",
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                gap: 1.5
            }}>
                <Input variant="soft" placeholder="Quiz name" />
                <Textarea variant="soft" placeholder="Quiz description"
                    minRows={3}
                    maxRows={6}
                />
                <Input variant="soft" placeholder="Password" />
                <Input variant="soft" placeholder="Duration" />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 0.5
                }}>
                    <Button>SUBMIT</Button>
                    <Button
                        color="neutral"
                        variant="soft"
                    >EDIT QUESTIONS</Button>
                    <Button
                        color="danger"
                        variant="soft"
                    >DELETE QUIZ</Button>
                </Box>
            </Box>
        </Container>
    )
}
