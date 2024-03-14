import { useState, useContext } from 'react';
import { GlobalContext } from '../index';
import { Link } from "react-router-dom"
import { Box, Typography, Input, Button, Container } from '@mui/joy';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function NavBar() {
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
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography level="h2" sx={{
                        px: 2,
                        ml: smallScreen ? 0 : -2,
                        py: 1,
                        cursor: "pointer"
                    }}>BlitzQuiz</Typography>
                </Link>
                <Box sx={{
                    width: smallScreen ? "60%" : "auto",
                    display: (!smallScreen || (showNavbar && smallScreen)) ? "flex" : "none",
                    flexDirection: smallScreen ? "column" : "row",
                    gap: 1,
                    mt: smallScreen ? 1 : 0,
                    mb: smallScreen ? 1.2 : 0
                }}>
                    <Link to="/make" style={{ width: smallScreen ? "100%" : "auto" }}>
                        <Button sx={{ width: smallScreen ? "100%" : "auto" }}>MAKE QUIZ</Button>
                    </Link>
                    <Input
                        placeholder="Search quizzes..."
                        onChange={ event => setSearch(event.target.value) }
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
                }} onClick={ () => setShowNavbar(!showNavbar) } />
            </Container>
        </Box>
    );
}
