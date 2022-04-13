import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useState } from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';


function DentistAccordion({data}) {


    return (
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {data.patient_id}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <form >
                        <p>
                        <p>
                        	Time: {data.appt_start_time}
                        </p>
                        <p>
                            Date: {data.appointment_date}
                        </p>
                        <p>
                            Status: {data.status}
                        </p>
                        <p>
                            Dentist: {data.dentist_id}
                        </p>
                        <p>
                            Type : {data.appointment_type}
                        </p>
                        </p>
                        <br />

                        <button className='btn btn-success'>Book Now!</button>
                    </form>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default DentistAccordion;

// <div className='btn btn-success'>Book Now!</div>
