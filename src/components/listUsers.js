import Axios from 'axios'
import {useEffect, useState} from 'react'

function ListUsers() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        //Get environment details
        const environment = 'http://localhost:5000'

        const getStudents = async () => {
            try {
                const url = environment+'/student'
                const studentData = await Axios.get(url)
                setStudents(studentData.data)
                console.log(studentData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getStudents()
    },[])

    return (
    <>
        <h2>List of all Students</h2>
        <div className='student'>{
        students.map((student, index) => {
            return (
            <>
                <br></br>
                <h3>Name : {student.name.firstName+' '+student.name.lastName}</h3>
                <div>registration : {student.registration}</div>
                <div>phone number : {student.phone}</div>
                <div>Email ID : {student.email}</div>
                <div>Course ID : {student.course}</div>
                <div>Year : {student.year}</div>
            </>
            )
        })
        }</div>
    </>
    )
}

export default ListUsers