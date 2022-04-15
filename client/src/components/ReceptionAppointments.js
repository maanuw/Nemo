import React, { useState, useEffect } from "react";
import AppointmentPopup from "./ReceptionAppointmentPopup";


function ReceptionAppointments({ data }) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

    const [dentist, setDentist] = useState([]);

    async function getDentist() {
        try {
            console.log(data.dentist_id);
            const response = await fetch("http://localhost:3001/branch/dentists", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    d_id: data.dentist_id
                })
            });
            const parseRes = await response.json();
            console.log(parseRes);
            setDentist(parseRes);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDentist()
    }, [])

    return (
        <>
            <td>{data.procedure_name}</td>
            <td>{data.user_name}</td>
            <td>{data.appt_start_time}</td>
            <td>{data.appointment_date.split("T")[0]}</td>
            <td>{data.status}</td>
            <td>{dentist.dentist_name} </td>
            <td><AppointmentPopup data={data} /></td>
        </>
    )
}

export default ReceptionAppointments;