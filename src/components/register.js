import React,{useState, useEffect} from 'react';
import '../styles/index.css';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

function AddStudent({setLoggedIn}) {

    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);
    const [passwordMatches, setPasswordMatches] = useState('placeholder');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [newUser, setNewUser] = useState({
        'name' : {
            'firstName' : undefined,
            'middleName' : undefined,
            'lastName' : ''
        },
        'email' : '',
        'phone' : '',
        'password' : '',
        'year' : '',
        'dateOfBirth' : '',
        'cgpa' : '',
        'interests' : '',
        'skills' : '',
        'course' : undefined,
        'preferredLocations' : '',
        'certificates' : ''
    });

    const submit = async (event)=> {
        event.preventDefault();
        //Check if both password and confirm password strings are same or not
        
        if(!passwordMatches) {
            
            alert('Please enter the passwords correctly')
            return;
        }
        const url = 'http://localhost:5000/student'

        //Trigger api to create new user
        try{
            //change sent state to true
            console.log(newUser)
            setSent(true);
            const response = await axios.post(url, newUser);
            localStorage.setItem('loggedInStudent', JSON.stringify({
                ...response.data,
            }));

            setLoggedIn(true);
            //Prep to redirect to home
            setRedirectToHome(true);
        }catch(e){
            alert(e)
        }
    }

    const getValue = (event) => {
        
        const elementName = event.target.name;
        let elementValue = event.target.value;
        //set the newUser state creating a new object
        setNewUser(()=> {
            let result = newUser;

            if(elementName === 'confirmPassword'){
                if(result['password'] === elementValue)
                    setPasswordMatches(true);
                else
                    setPasswordMatches(false);    
            }else if(elementName.includes('.')) {
                //Handle object based attributes
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else {
                if(elementValue.includes(','))
                    elementValue = elementValue.split(',')   
                result[elementName] = elementValue
            }

            return result;
        });
    }

    if(redirectToHome){
        return (
            <Navigate to='/'/>
        )
    }

    const output = (
        <div className='loginRegister'>
            <form className='centerElements' onSubmit={submit}>
                <h2>Enter student details here</h2>

                <div>Name :
                    <div className='descriptionInputLogin'><div className='description'>First name</div>
                    <input onChange={getValue} required name='name.firstName'></input></div>

                    <div className='descriptionInputLogin'><div className='description'>Middle name</div>
                    <input onChange={getValue} name='name.middleName'></input></div>

                    <div className='descriptionInputLogin'><div className='description'>Last name</div>
                    <input onChange={getValue} required name='name.lastName'></input></div>
                </div>

                <div className='descriptionInputLogin'><div className='description'>Email :</div>
                <input onChange={getValue} required name='email'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Phone :</div>
                <input onChange={getValue} required name='phone'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Registration :</div>
                <input onChange={getValue} required name='registration'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Course :</div>
                <input onChange={getValue} required name='course'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Year :</div>
                <input onChange={getValue} required name='year'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Interests :</div>
                <input onChange={getValue} required name='interests'></input></div>

                <div className='descriptionInputLogin'><div className='description'>CGPA :</div>
                <input onChange={getValue} required name='cgpa'></input></div>

                <div className='descriptionInputLogin'><div className='skills'>Skills and profeciency :</div>
                <input onChange={getValue} required name='skills'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Date of Birth :</div>
                <input onChange={getValue} required name='dateOfBirth'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Password :</div>
                <input type='password' onChange={getValue} required name='password'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Confirm Password :</div>
                <input onChange={getValue} required name='confirmPassword' className={(!passwordMatches)? 'passwordMatches' : ''}></input></div>

                <button name='register'>Register</button>
            </form>
        </div>
    );

    return output ;
}

export default AddStudent