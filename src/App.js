import React from 'react';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Login from "./pages/Login";

function App() {
  return (
    <React.StrictMode>
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/library" element={<Library/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </Router>
    </React.StrictMode>
)};

export default App;
