import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import LatencyTest from './components/latencyTest'
import Home from './components/home'
import AboutMe from './components/aboutMe'
import Register from './components/register'
import Login from './components/login'
import Logout from './components/logout'
import EditUser from './components/editUser'
import Navbar from './components/navbar'
import ListUsers from './components/listUsers'
import Delete from './components/delete'

function Router() {

    //To check if app has a logged in user or not
    const [loggedIn, setLoggedIn] = useState(()=> {
        return (JSON.parse(localStorage.getItem('loggedInStudent'))) ? true : false;
    })

    return (
    <BrowserRouter>
    <Navbar loggedIn={loggedIn}/>
        <Routes>
            
            <Route path='/latency' element={<LatencyTest/>}/>
            <Route path='/aboutMe' element={<AboutMe/>}/>
            <Route path='/register' element={<Register setLoggedIn={setLoggedIn}/>}/>
            <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
            <Route path='/logout' element={<Logout setLoggedIn={setLoggedIn}/>}/>
            <Route path='/delete' element={<Delete setLoggedIn={setLoggedIn}/>}/>
            <Route path='/me/*' element={<EditUser setLoggedIn={setLoggedIn}/>}/>
            <Route path='/all' element={<ListUsers/>}/>
            <Route path='/' element={<Home loggedIn={loggedIn}/>}/>
        </Routes>    
    </BrowserRouter>)
}

export default Router