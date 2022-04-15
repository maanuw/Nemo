/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {toast} from "react-toastify";
import { useEffect, useState } from 'react';

function AddTreatmentPopup({ data }) {

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('token', localStorage.token);

    const [inputs, setInputs] = useState({
        medication_body: "",
        symptoms: "",
        teeth_info: "",
        more_comments: "",
        treatment_name: "",
        more_link: ""
    });

    const { medication_body,
        symptoms,
        teeth_info,
        more_comments,
        treatment_name,
        more_link } = inputs;


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const body = {
                medication_body,
                symptoms,
                teeth_info,
                more_comments,
                treatment_name,
                more_link
            };
            const response = await fetch("http://localhost:3001/admin/addTreatment", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes.state) {
                toast.success("Treatment Added successfully!");
            } else {
                toast.error("Treatment Creation failed!");
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Popup trigger={<button className="btn btn-primary"> Add </button>} modal>
            <div className='modal-header'>
                <h5 className='modal-title'>New Treatment</h5>
            </div>

            <div className="modal-body">
                <form onSubmit={onSubmitForm}>
                <div class="mb-3">
                        <label className="form-label my-3">Name</label>
                        <textarea class="form-control my -3" rows="3" name="treatment_name" value={treatment_name} onChange={e => onChange(e)}></textarea>
                    </div>
                <div class="mb-3">
                        <label className="form-label my-3">body</label>
                        <textarea class="form-control my -3" rows="3" name="medication_body" value={medication_body} onChange={e => onChange(e)}></textarea>
                    </div>
                    <div class="mb-3">
                        <label className="form-label my-3">Symptoms</label>
                        <textarea class="form-control my -3" rows="3" name="symptoms" value={symptoms} onChange={e => onChange(e)}></textarea>
                    </div>
                    <div class="mb-3">
                        <label className="form-label my-3">Teeth info</label>
                        <textarea class="form-control my -3" rows="3" name="teeth_info" value={teeth_info} onChange={e => onChange(e)}></textarea>
                    </div>
                    <div class="mb-3">
                        <label className="form-label my-3">Link</label>
                        <textarea class="form-control my -3" rows="3" name="more_link" value={more_link} onChange={e => onChange(e)}></textarea>
                    </div>
                    <button className="btn btn-success btn-block btn-padding-x-sm:10px">Create</button>
                </form>
            </div>

            {/* might remove footer*/}
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>

        </Popup>
    )

};

export default AddTreatmentPopup;