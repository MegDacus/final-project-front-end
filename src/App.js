import React, {useState, useEffect} from 'react';
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
import UserContext, { UserProvider } from './components/UserContext';
import Book from './pages/Book';
import Club from './pages/Club';
import UserDashboard from './pages/UserDashboard';
import NotFound from './components/NotFound';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("running")
    const fetchData = async () => {
      if(!user) {
        await getUser();
      }
    }
    fetchData()
   },[user])

 const getUser = async () => {
   await fetch('http://localhost:3000/me')
   .then((r) => {
     if (r.ok) {
       r.json().then((data) => {
     setUser({
       "id": data.id, 
       "username": data.username,
       "first_name": data.first_name,
       "last_name": data.last_name,
       "memberships": data.memberships,
       "is_admin": data.is_admin,
       "bookclubs": data.bookclubs,
       "profile_pic": data.profile_pic
     })
   })} else {
     setUser(null);
   }}
 )};

  return (
    <React.StrictMode>
      <Router>
        <UserContext.Provider value={user}>
        <NavbarMain setUser={setUser}/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/search" element={<Search/>}></Route>
            <Route exact path="/library" element={<Protected ProtectedComponent={<Library/>} adminAccess={false}/>}/>
            <Route exact path="/books/:id" element={<Protected ProtectedComponent={<Book/>} adminAccess={false}/>}/>
            <Route exact path="/clubs/:id" element={<Protected ProtectedComponent={<Club/>} adminAccess={false}/>}/>
            <Route exact path="/login" element={<Login setUser={setUser}/>}></Route>
            <Route exact path="/clubs" element={<Protected ProtectedComponent={<Clubs/>} adminAccess={false}/>}/>
            <Route exact path="/signup" element={<Signup setUser={setUser}/>}></Route>
            <Route exact path="/new-club" 
              element={<Protected ProtectedComponent={<NewClub/>} adminAccess={false}/>}>
            </Route>
          <Route exact path="/dashboard" element={<Protected ProtectedComponent={<UserDashboard/>} adminAccess={false}/>}/>
          <Route path="*" element={<NotFound/>}/>
          </Routes>
          </UserContext.Provider>
        </Router>
    </React.StrictMode>
)};

export default App;
