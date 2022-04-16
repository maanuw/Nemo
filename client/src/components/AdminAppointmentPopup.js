/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {toast} from "react-toastify";
import {useState} from 'react';


function AdminAppointmentPopup({data}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);
    const appointment_id = data.appointment_id;
    
    const [inputs, setInputs] = useState({
        status: data.status,
        doc_comments: data.doc_comments
    });

    const { status, doc_comments} = inputs;   


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
                console.log(appointment_id);
                const body = {status, doc_comments, appointment_id};
                const response = await fetch("http://localhost:3001/dentist/note", {
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
                <h5 className='modal-title'>{data.u_name}: Admin Access Card</h5>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmitForm}>
                    <h4>Change Role:</h4>
                    Email: {data.user_email}
                    <select className="form-select my-3" name="status" value={status} onChange={e => onChange(e)}>
                        <option selected>{data.user_role}</option>
                        <option value="dentist">Change status to Dentist</option>
                        
                    </select>
                    <button className="btn btn-success btn-block btn-padding-x-sm:10px">Save</button>
                </form>
            </div>
            {/* might remove footer*/}
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>

        </Popup>
)};

export default AdminAppointmentPopup;