import { useState, useContext } from 'react';
import { GlobalContext } from '../index';
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Input, Button, Container } from '@mui/joy';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function NavBar() {
    const navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState(false);
    const { smallScreen, setSearch } = useContext(GlobalContext);

    return (
        <Box sx={{
            bgcolor: "background.level1",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
        }}>
            <Container sx={{
                display: "flex",
                flexDirection: smallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1
            }}>
                <Typography level="h2" sx={{
                    px: 2,
                    ml: smallScreen ? 0 : -2,
                    py: 1,
                    cursor: "pointer"
                }} onClick={() => navigate("/")}
                >BlitzQuiz</Typography>
                <Box sx={{
                    width: smallScreen ? "60%" : "auto",
                    display: (!smallScreen || (showNavbar && smallScreen)) ? "flex" : "none",
                    flexDirection: smallScreen ? "column" : "row",
                    gap: 1,
                    mt: smallScreen ? 1 : 0,
                    mb: smallScreen ? 1.2 : 0
                }}>
                    <Button onClick={() => navigate("/make")}>MAKE QUIZ</Button>
                    <Input
                        placeholder="Search quizzes..."
                        onChange={event => setSearch(event.target.value)}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </Box>
                <MenuRoundedIcon sx={{
                    fontSize: 28.5,
                    display: smallScreen ? "block" : "none",
                    position: "absolute",
                    top: 17.5,
                    right: 20,
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    borderRadius: 1.6,
                    ":hover": {
                        bgcolor: "#dde7ee"
                    },
                    ":active": {
                        bgcolor: "#cdd7e1"
                    }
                }} onClick={() => setShowNavbar(!showNavbar)} />
            </Container>
        </Box>
    );
}
