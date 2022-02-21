import React from 'react'

function Home({loggedIn}) {
    let student 
    if(loggedIn) {
        student = JSON.parse(localStorage.getItem('loggedInStudent'))
    }

    return (<>
        <h2>Hello {(loggedIn)? student.name.firstName : undefined}</h2>
    </>)
}

export default Home