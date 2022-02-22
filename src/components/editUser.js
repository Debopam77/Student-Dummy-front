import React,{useState} from 'react';
import '../styles/index.css'
import '../styles/loginRegister.css'
import {Navigate} from 'react-router-dom'
import axios from 'axios';

function EditUser({setLoggedIn}) {
    //Use to track value of student found in local storate
    const student = JSON.parse(localStorage.getItem('loggedInStudent'))
    //State to figure out when to redirect page back to user detail page after edit or create
    const[redirectState, setRedirectState] = useState(false)

    //Values that cannot be changed
    const excludedAttributes = ['']
    let defaultValue = Object.keys(student)
        .filter((key) => !excludedAttributes.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key] : student[key],
                'registration' : student['registration']
            }
        }, {})
    
    //State to store the created or updated user string
    const [newValue, setNewValue] = useState(defaultValue)
    let deleteFlag = false
    //onChange triggered function to update 
    const getValue = (event)=> {
        
        const elementName = event.target.name;
        let elementValue = event.target.value;
        
        //Setting the value of the state using the changed input fields
        setNewValue(()=> {
            
            let result = newValue;

            if(elementName.includes('.')) {
                //Handle object based attributes
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else
                //Handle normal attributes
                result[elementName] = elementValue; 
            return result;
        });
    }

    //Submit button is clicked
    const submitData = async (event)=> {
        event.preventDefault();
        let payload = newValue;

        const url = 'http://localhost:5000/student'

        //Call the edit user api
        try {
            //Making the request with the PAYLOAD and the Configurations
            const res = await axios.patch(url, payload);

            localStorage.setItem('loggedInStudent', JSON.stringify({
                ...res.data
            }))

            //Tell the component to redirect back to the details page
            alert('Saved!')
        }catch(e){
            console.log(e)
            alert(e.message);
        }
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <Navigate to='/delete'/>     
        )
    }

    const output = (
        <div className='loginRegister'>

            <h2>Add or edit details</h2>

            <form onSubmit={submitData}>

            <div className='descriptionInput'><div className='description'>First Name</div>
                <input type="text" name={'name.firstName'} defaultValue={student.name.firstName} onChange={getValue}></input></div>
                
                <div className='descriptionInput'><div className='description'>Middle Name</div>
                <input type="text" name={'name.middleName'} defaultValue={student.name.middleName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Last Name</div>
                <input type="text" name={'name.lastName'} defaultValue={student.name.lastName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Registration</div>
                <div className='highlight'>{student.registration}</div></div>

                <div className='descriptionInput'><div className='description'>Phone Number</div>
                <div className='highlight'>{student.phone}</div></div>
                
                <div className='descriptionInput'><div className='description'>Email-ID</div>
                <input type="text" name={'email'} defaultValue={student.email} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Age</div></div>
                <div className='highlight'>{student.age}</div>

                <div className='descriptionInput'><div className='description'>Date of Birth</div>
                <input type="text" name={'dateOfBirth'} defaultValue={student.dateOfBirth} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Year</div>
                <input type="text" name={'year'} defaultValue={student.year} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Course</div>
                <input type="text" name={'course'} defaultValue={student.course} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>CGPA</div>
                <input type="text" name={'cgpa'} defaultValue={student.cgpa} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Skills and Technologies</div>
                <input type="text" name={'skills'} defaultValue={student.skills} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Interests</div>
                <input type="text" name={'interests'} defaultValue={student.interests} onChange={getValue}></input></div>

                <button>Save</button>
            </form>
                <button onClick={()=>{
                    setRedirectState(true)}}>Delete User</button>
        </div>
    );

    return output ;
}

export default EditUser