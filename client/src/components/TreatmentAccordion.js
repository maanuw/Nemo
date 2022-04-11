import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import {toast} from "react-toastify";
import 'react-accessible-accordion/dist/fancy-example.css';


function TreatmentAccordion({data}) {
    const [value, onChange] = useState(new Date());
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const treatmentid = data.treatment_id;
            const date = value.toLocaleDateString();
            const time = value.toLocaleTimeString();
            const appointment_type = data.procedure_id;
            const status = "scheduled";
            const body = {treatmentid, date, time, appointment_type, status};
            const response = await fetch("http://localhost:3001/appointment/", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            
            if(parseRes.state){
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
                        {data.procedure_name}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form onSubmit={onSubmitForm}>
                        <p>
                            {data.procedure_description}
                        </p>
                        <br />
                        <DateTimePicker
                            amPmAriaLabel="Select AM/PM"
                            calendarAriaLabel="Toggle calendar"
                            clearAriaLabel="Clear value"
                            dayAriaLabel="Day"
                            hourAriaLabel="Hour"
                            maxDetail="second"
                            minuteAriaLabel="Minute"
                            monthAriaLabel="Month"
                            nativeInputAriaLabel="Date and time"
                            secondAriaLabel="Second"
                            yearAriaLabel="Year"
                            onChange = {onChange}
                            value={value}
                        />
                        <button className='btn btn-success'>Book Now!</button>
                    </form>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default TreatmentAccordion;

// <div className='btn btn-success'>Book Now!</div>