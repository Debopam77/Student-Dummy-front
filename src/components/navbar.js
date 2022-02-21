import React, { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/navbar.css'
function Navbar({loggedIn}) {

    const [user, setUser] = useState()
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInStudent')));
    }, [loggedIn])

    let navBarItems = [
        {
            title : 'Home',
            url : '/',
            class : 'nav-links'
        },
        {
            title : 'Latency Test',
            url : '/latency',
            class : 'nav-links'
        },
        {
            title : 'All users',
            url : '/all',
            class : 'nav-links'
        },
        {
            title : 'Login',
            url : '/login',
            class : 'nav-links'
        },
        {
            title : 'About Us',
            url : '/aboutUs',
            class : 'nav-links'
        },
    ]

    //Things to change once an user logs in
    if(loggedIn){
        //Add logout link
        navBarItems[3] = {
            title : 'Logout',
            url: '/logout',
            class: 'nav-links'
        }
        
        navBarItems[2] = {
            title : 'My Info',
            url : '/me',
            class : 'nav-links'
        }
    }

    return (
        
        <div className = 'navbar'>
            <div className = 'navchunk'>
                <div className = 'links' id=''>
                    {navBarItems.map((item, index)=> {
                        return (
                            <a key={'navLink'+index} className={item.class} href={item.url}>{item.title}</a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar
