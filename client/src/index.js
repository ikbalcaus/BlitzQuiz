import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import NavBar from './components/NavBar';
import IndexPage from './pages/IndexPage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={ <IndexPage /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
