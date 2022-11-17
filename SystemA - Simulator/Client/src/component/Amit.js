import Axios from "axios";

import React, { useState } from 'react';

export default function Amit() {

    const [clr, setClr] = useState("blue");
    const [date, setDate] = useState("");




    const Start_Simulate = async (e) =>{
        await Axios.post('http://localhost:5000/auto_sales_simulate',{begin_date:e.target.value, finish_date:e.target.value});
    };

    const handleChangeDate = async (e) => {
		await Axios.get(`http://localhost:5000/date/${e.target.value}`).then(
			(response) => setDate(JSON.stringify(response.data))
		);
		console.log(e.target.value);
	};

    return (
        <>
        <form>
            <button type="subit"></button>
        </form>
            <p>aaaa</p>
            <input type={"button"} value={"press me"}
            style={{color: clr}}
            onClick={(e)=>Start_Simulate(e)}            />
    

            <input
					type="date"
					name="date"
                    id="date"
					onChange={(e) => handleChangeDate(e)}
				></input>
				{
					<p>{date}</p>
				}
        </>
    )
}