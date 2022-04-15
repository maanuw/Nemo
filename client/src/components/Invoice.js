import React, {  useState, useEffect } from "react";
import {toast} from "react-toastify";


function Invoice({data}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);
    const dateArray = data.appointment_date.split("T");
    const strippedDate = dateArray[0];
    const appointment_id = data.appointment_id;

    const [inputs, setInputs] = useState({
        status: data.status,
        appt_start_time: data.appt_start_time,
        appointment_date: strippedDate,
    });

    const { status, appt_start_time, appointment_date } = inputs;   


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            if (status === "cancelled"){
                const body = {status, appointment_id};
                const response = await fetch("http://localhost:3001/appointment/cancel", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                if(parseRes.state){
                    toast.success("Appointment Cancelled successfully!");
                } else {
                    toast.error("Appointment Cancellation failed!");
                }
            }else{
                console.log(appointment_id);
                const body = {status, appt_start_time, appointment_date, appointment_id};
                const response = await fetch("http://localhost:3001/appointment/update", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body)
                });
                
                const parseRes = await response.json();
                if(parseRes.state){
                    toast.success("Appointment updated successfully!");
                } else {
                    toast.error( "Failed to save changes!");
                }

            }


        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <h1>Coming Soon!</h1>    )
    
}

export default Invoice;