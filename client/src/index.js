import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';
import QuizInfoPage from './pages/QuizInfoPage';
import ExamPage from './pages/ExamPage';
import MakeQuizPage from './pages/MakeQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import QuestionsPage from './pages/QuestionsPage';
import ResultsPage from './pages/ResultsPage';

export const GlobalContext = createContext();

function App() {
    const smallScreen = useMediaQuery("(max-width: 600px)");
    const [search, setSearch] = useState("");
    const [nickname, setNickname] = useState("");
    const serverAddress = "http://localhost:8080";

    return (
        <BrowserRouter>
        <GlobalContext.Provider value={{ search, setSearch, smallScreen, nickname, setNickname, serverAddress }}>
            <NavBar />
            <Routes>
            <Route path="/" element={ <IndexPage /> } />
            <Route path="/quiz/:id" element={ <QuizInfoPage /> } />
            <Route path="/exam/:id" element={ <ExamPage /> } />
            <Route path="/make" element={ <MakeQuizPage /> } />
            <Route path="/edit/:id" element={ <EditQuizPage /> } />
            <Route path="/edit/:id/questions" element={ <QuestionsPage /> } />
            <Route path="/results/:id" element={ <ResultsPage /> } />
            </Routes>
        </GlobalContext.Provider>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
