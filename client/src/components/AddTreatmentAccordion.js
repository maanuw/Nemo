import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useState } from 'react';
import {toast} from "react-toastify";
import 'react-accessible-accordion/dist/fancy-example.css';


function AddTreatmentAccordion({data}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);
    const treatment_name = data;
    const [inputs, setInputs] = useState({
        procedure_name: "",
        procedure_description: "",
        amount: 0
    });

    const { procedure_name, procedure_description, amount } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const body = {treatment_name, procedure_description, procedure_name, amount};
            const response = await fetch("http://localhost:3001/admin/addProcedure", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            
            if(parseRes.state ){
                toast.success("Appointment Scheduled successfully!");
            } else {
                toast.error("Appointment booking failed!");
            }

        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Add New Treatment Procedure
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={onSubmitForm}>
                        <div class="mb-3">
                            <label className="form-label my-3">Name Of Procedure</label>
                            <textarea class="form-control my-3" rows="3" name="procedure_name" value={procedure_name} onChange={e => onChange(e)}></textarea>
                        </div>
                        <div class="mb-3">
                            <label className="form-label my-3">Description of Procedure</label>
                            <textarea class="form-control my-3" rows="3" name="procedure_description" value={procedure_description} onChange={e => onChange(e)}></textarea>
                        </div>
                        <div class="input-group my-3">
                            <span class="input-group-text">$</span>
                            <input type="text" class="form-control" name="amount" value={amount} onChange={e => onChange(e)}/>
                            <span class="input-group-text">.00</span>
                        </div>
                        <button className='btn btn-success'>Create</button>
                    </form>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default AddTreatmentAccordion;

// <div className='btn btn-success'>Book Now!</div>