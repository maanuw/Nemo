/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import 'reactjs-popup/dist/index.css';

function Record({data}) {
    const dateArray = data.appointment_date.split("T");
    const strippedDate = dateArray[0];

    if(data.status === "completed"){
        return (
            <div className="modal-dialog modal-dialog-scrollable">
                <h4>{data.treatment_name} Treatment</h4>
                <h5>Procedure: {data.procedure_name}</h5>
                <h5>Date: {strippedDate} Time: {data.appt_start_time} [24 Hour Format]</h5>
                <div className='container border'>
                    <h4>Doctors Notes:</h4>
                    <hr />
                    <h4>Medication</h4>
                    <hr />
                    <h4>Recommendation</h4>
                    <hr />
                </div>
                <div className='container border'>
                    <h5>Dentist Profile</h5>
                    <h6>Name: {data.dentist_name.split(",")[0].split("(")[1]} {data.dentist_name.split(",")[1].split(")")[0]}</h6>
                </div>
            </div>
        )
    }
    return (
        <h2 className="text-center my-5">Unfortunately this appointment did not take place!</h2>
        )


}

export default Record;