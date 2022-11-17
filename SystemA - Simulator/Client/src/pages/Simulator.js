
import axios from 'axios'
import React from "react" //{Component,useEffect,useState}
import "../styles.css"


export default function Simulator() {
    return (
        <>
            <h1>Simulator For Sales</h1>
            <button type="button" className="button"  
                    onClick={async (e)=> await axios.get('http://localhost:5000/simulator')} id="simulator">Start Simulator</button>

        </>
    )
}
