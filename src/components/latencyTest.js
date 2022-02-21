import axios from 'axios'
import {useEffect, useState} from 'react'
import '../styles/loginRegister.css'
function LatencyTest() {
        const [latency, setLatency] = useState()
        const send = async (event) => {
            event.preventDefault();
            const url = 'http://localhost:5000/aboutUs'
            const start = new Date()
            const res = await axios.get(url)
            const end = new Date()
            setLatency(end - start)
        }
        const latencyElement = (latency)? (<div>{latency} milliseconds</div>) : undefined
        return (
        <div className='loginRegister'>
            <h2>Hello!</h2>
            <form onSubmit={send}>
                <h3>Server Latency check:</h3>
                <button>Check</button>
            </form>
            {latencyElement}
        </div>)
    }
    
    export default LatencyTest