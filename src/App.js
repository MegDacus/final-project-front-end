import React, {useState} from 'react';
import './index.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Login from "./pages/Login";
import NavbarMain from "./components/NavbarMain";
import Clubs from "./pages/Clubs";
import NewClub from './pages/NewClub';
import Protected from './components/Protected';
import Signup from './pages/Signup';
import { UserProvider } from './components/UserContext';
import AdminHome from './pages/AdminHome';
import UserProfile from './pages/UserProfile';
import BookPage from './pages/BookPage';

function App() {
  
  return (
    <React.StrictMode>
      <Router>
        <UserProvider>
        <NavbarMain/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route exact path="/library" element={<Library/>}></Route>
            <Route exact path="/:id" element={<BookPage/>}></Route>
            <Route path="/clubs" element={<Clubs/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/clubs" element={<Clubs/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/new-club" 
              element={<Protected ProtectedComponent={<NewClub/>} adminAccess={false}/>}>
            </Route>
            <Route path="/admin-home" element={<Protected ProtectedComponent={<AdminHome/>} adminAccess={true}/>}></Route>
          <Route path="/profile" element={<Protected ProtectedComponent={<UserProfile/>} adminAccess={false}/>}/>
          </Routes>
          </UserProvider>
        </Router>
    </React.StrictMode>
)};

export default App;
