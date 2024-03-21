import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';
import QuizInfoPage from './pages/QuizInfoPage';
import ExamPage from './pages/ExamPage';
import MakeQuizPage from './pages/MakeQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import QuestionsPage from './pages/QuestionsPage';

export const GlobalContext = createContext();

function App() {
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const [search, setSearch] = useState([]);
  const [nickName, setNickName] = useState("");

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ search, setSearch, smallScreen, nickName, setNickName }}>
        <NavBar />
        <Routes>
          <Route path="/" element={ <IndexPage /> } />
          <Route path="/quiz/:id" element={ <QuizInfoPage /> } />
          <Route path="/exam/:id" element={ <ExamPage /> } />
          <Route path="/make" element={ <MakeQuizPage /> } />
          <Route path="/edit/:id" element={ <EditQuizPage /> } />
          <Route path="/edit/:id/questions" element={ <QuestionsPage /> } />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
