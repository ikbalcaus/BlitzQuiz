import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';

export const SearchContext = createContext();

function App() {
  const [search, setSearch] = useState([]);

  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ search, setSearch }}>
        <NavBar />
        <Routes>
          <Route path="/" element={ <IndexPage /> } />
        </Routes>
      </SearchContext.Provider>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
