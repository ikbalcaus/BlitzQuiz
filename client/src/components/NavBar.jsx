import { useState } from 'react';
import { Box, Typography, Input, Button, Container } from '@mui/joy';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function NavBar() {
    const smallScreen = useMediaQuery("(max-width: 500px)");
    const [showSearch, setShowSearch] = useState(false);

    return (
        <Box bgcolor={"background.level1"}>
            <Container sx={{
                display: "flex",
                flexDirection: smallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 0.9,
                pb: 1.4
            }}>
                <Typography level="h2" sx={{
                    px: 2,
                    ml: -2,
                    py: 1,
                    cursor: "pointer"
                }}>BlitzQuiz</Typography>
                <Box sx={{
                    width: smallScreen ? "60%" : "auto",
                    display: (!smallScreen || (showSearch && smallScreen)) ? "flex" : "none",
                    flexDirection: smallScreen ? "column" : "row",
                    gap: 1,
                    mt: smallScreen ? 1 : 0.4,
                    mb: smallScreen ? 1.2 : 0
                }}>
                    <Button>MAKE QUIZ</Button>
                    <Input placeholder="Search quizzes..." />
                </Box>
                <MenuRoundedIcon sx={{
                    fontSize: 30,
                    display: smallScreen ? "block" : "none",
                    position: "absolute",
                    top: 17,
                    right: 20,
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    boxShadow: 1,
                    borderRadius: 1.6,
                    "&:hover": {
                        backgroundColor: "#dde7ee"
                    }
                }} onClick={() => setShowSearch(!showSearch)} />
            </Container>
        </Box>
    );
}
