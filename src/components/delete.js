import React, {useState} from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'


function Delete({setLoggedIn}) {
    //To intimate Redirect component
    const [redirectState, setRedirectState] = useState(false)

    //When any of the buttons are clicked
    const logoutActions = async (event)=> {
        //Remove the user data from local storage
        if(event.target.id === 'yes') {

            const registration = JSON.parse(localStorage.getItem('loggedInStudent')).registration
            try {
                await axios.delete('http://localhost:5000/student', { data: { registration: registration } })
            }catch(e) {
                alert(e.message)
            }
            
            localStorage.setItem('loggedInStudent', null)
            setLoggedIn(false)
        }
            
        //prep for redirect 
        setRedirectState(true)
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <Navigate to='/'/>     
        )
    }

    //Show logout options    
    const output = (
        <div className='loginRegister'>
            <h2>Want to Delete User?</h2>
            <button onClick={logoutActions} id='yes'>Yes</button>
            <button onClick={logoutActions} id='no'>No</button>
        </div>
    )
    return output
}

export default Delete