/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {toast} from "react-toastify";
import {useState, useEffect} from 'react';


function ReceptionAppointmentPopup({data}) {
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
        dentist_id: data.dentist_id
    });

    const { status, appt_start_time, appointment_date, dentist_id } = inputs;   


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const [dentists, setDentists] = useState([]);

    async function getDentists() {
        try {
            const response = await fetch("http://localhost:3001/branch/all-dentists", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setDentists(parseRes);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDentists()
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
                console.log(dentist_id);
                const body = {status, appt_start_time, appointment_date, appointment_id, dentist_id};
                const response = await fetch("http://localhost:3001/reception/update", {
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

            } catch (error) {
                console.error(error.message);
        }

    }


    return (
        <Popup trigger={<button className="btn btn-success"> Edit </button>} modal>
            <div className='modal-header'>
                <h5 className='modal-title'>My Appointment Card</h5>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmitForm}>
                    <select className="form-select my-3" name="status" value={status} onChange={e => onChange(e)}>
                        <option selected>{data.status}</option>
                        <option value="cancelled">Cancel Appointment</option>
                        <option value="no-show">No-Show</option>
                        <option value="reschedule">Re-Schedule</option>
                    </select>
                    <select className="form-select my-3" name="dentist_id" value={dentist_id} onChange={e => onChange(e)}>
                        <option selected>{data.dentist_id}</option>
                        {dentists.map((item, index) => {
                            return (
                                <option key={index} value={item.d_id}>{item.dentist_name}</option>
                            )
                        })}
                    </select>
                    <input type="date" name="appointment_date" placeholder="Date" className="form-control my-3" value={appointment_date} onChange={e => onChange(e)} />
                    <input type="time" name="appt_start_time" placeholder="Time" className="form-control my-3" value={appt_start_time} onChange={e => onChange(e)} />
                    <button className="btn btn-success btn-block btn-padding-x-sm:10px">Save</button>
                </form>
            </div>
            {/* might remove footer*/}
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>

        </Popup>
)};

export default ReceptionAppointmentPopup;