import React, {  useState, useEffect } from "react";
import '../css/Table.css';


function ReceptionAppTable({data}){
    return (
        <div className="scrollable-div">
        <table className="table table-dark">
            <tbody>
                <tr>
                    <th>Patient Name</th>
                    <th>Dentist Name</th>
                    <th>Appointment Type</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.user_name}</td>
                            <td>{item.dentist_id}</td>
                            <td>{item.procedure_name}</td>
                            <td>{item.appt_start_time}</td>
                            <td>{item.appointment_date}</td>
                            <td>{item.status}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )

}

export default ReceptionAppTable;