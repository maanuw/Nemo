/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useEffect, useState} from 'react';
import Accordion from './TreatmentAccordion';

function TreatmentPopup({data}) {

    const [treatmentData, setTreatments] = useState([]);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

    async function getTreatments() {
        try {
            const response = await fetch("http://localhost:3001/treatment/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    treatment_name: data
                })
            });
            const parseRes = await response.json();
            setTreatments(parseRes);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTreatments()
    }, [])

    
    return (
        <Popup trigger={<button className="btn btn-primary"> Book Appointment </button>} modal>
            <div className='modal-header'>
                <h5 className='modal-title'>Available Procedures for this Treatment</h5>
            </div>
            <div className="modal-body">
                {treatmentData.map((item, index) => {
                    return (
                        <div key={index}>
                            <Accordion data={item} />
                        </div>
                    )
                })}
            </div>
            {/* might remove footer*/}
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>

        </Popup>
    )
    
};

export default TreatmentPopup;