import React from 'react';
import './index.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Clubs from "./pages/Clubs";
import NewClub from "./pages/NewClub"

function App() {
  return (
    <React.StrictMode>
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/library" element={<Library/>}></Route>
            <Route path="/clubs" element={<Clubs/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/new-club" element={<NewClub/>}></Route>
          </Routes>
        </Router>
    </React.StrictMode>
)};

export default App;
