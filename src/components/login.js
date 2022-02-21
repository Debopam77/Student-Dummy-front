import React, {useState, useEffect} from 'react'
import '../styles/loginRegister.css'
import {Navigate} from 'react-router-dom'
import axios from 'axios'

function Login({setLoggedIn}) {

    const [sent, setSent] = useState(undefined);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);

    const [inputValues, setInputValues] = useState({
        registration : '',
        password : ''
    })

    //To intimate the redirect component
    const [redirectState, setRedirectState] = useState(false)

    //Passing the values to the login api
    const login = async (event)=> {
        //form submit doesn't refresh page
        event.preventDefault()
    
        //call axios api
        const url = 'http://localhost:5000/student/login'
        console.log(url)

        try {
            console.log(inputValues)
            //Change the sent state to true
            setSent(true)
            //const response = await 
            const res = await axios.post(url, {
                "registration" : "21MCS0003",
                "password" : "Qwerty123"
            })
            
            //Store login data in the browser local storage
            localStorage.setItem('loggedInStudent', JSON.stringify({
                ...res.data,
            }))
            setLoggedIn(true)
            //Prep for redirect to home
            setRedirectState(true)
        }catch(e){
            console.log(e)
            alert(e.response.data.error)
        }
    }

    const getValue = (event) => {
        
        setInputValues((inputValues)=> {
            return {
                ...inputValues,
                [event.target.name] : event.target.value
            }
        })        
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <Navigate to='/' />    
        )
    }

    const output = (
        <div className='loginRegister'>
            <h2>Enter your login details</h2>
            <form className='centerElements' onSubmit={login}>
                <div className='descriptionInputLogin'><div className='description'>Registration ID : </div><input onChange={getValue} name='registration'></input></div>
                <div className='descriptionInputLogin'><div className='description'>Password : </div><input onChange={getValue} name='password' type='password'></input></div>
                <div className='descriptionInputLogin'><div><a href='/register'>New user? Register here.</a></div></div>
                <button>Login</button>
            </form>
        </div>
    )
    return output
}

export default Login