import { useState, useContext } from 'react';
import { SearchContext } from '../index';
import { Box, Typography, Input, Button, Container } from '@mui/joy';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function NavBar() {
    const smallScreen = useMediaQuery("(max-width: 600px)");
    const [showSearch, setShowSearch] = useState(false);
    const { setSearch } = useContext(SearchContext);

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
                pt: 1.1,
                pb: 1
            }}>
                <Typography level="h2" sx={{
                    px: 2,
                    ml: smallScreen ? 0 : -2,
                    py: 1,
                    cursor: "pointer"
                }}>BlitzQuiz</Typography>
                <Box sx={{
                    width: smallScreen ? "60%" : "auto",
                    display: (!smallScreen || (showSearch && smallScreen)) ? "flex" : "none",
                    flexDirection: smallScreen ? "column" : "row",
                    gap: 1,
                    mt: smallScreen ? 1 : 0,
                    mb: smallScreen ? 1.2 : 0
                }}>
                    <Button>MAKE QUIZ</Button>
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
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: 1.6,
                    ":hover": {
                        backgroundColor: "#dde7ee"
                    },
                    ":active": {
                        backgroundColor: "#cdd7e1"
                    }
                }} onClick={ () => setShowSearch(!showSearch) } />
            </Container>
        </Box>
    );
}