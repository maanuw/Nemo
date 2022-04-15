import React, {  useState, useEffect } from "react";
import '../css/Table.css';
import AppointmentPopup from "./AppointmentPopup";


function PatientAppTable(){
    const [data, setData] = useState([]);

    async function getMyAppointments() {
        try {
            const response = await fetch("http://localhost:3001/appointment/myAppointments", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setData(parseRes);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMyAppointments()
    }, [])

    return (
        <div className="scrollable-div">
        <table className="table table-info table-striped table-hover">
            <tbody>
                <tr>
                    <th>Appointment Type</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Dentist Name</th>
                    <th>Edit</th>

                </tr>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.procedure_name}</td>
                            <td>{item.appt_start_time}</td>
                            <td>{item.appointment_date.split("T")[0]}</td>
                            <td>{item.status}</td>
                            <td>{item.dentist_name}</td>
                            <td><AppointmentPopup data={item}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )

}

export default PatientAppTable;