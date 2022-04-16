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


function AppointmentAccordion({data}) {
    
    
    return (
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {data.user_name}
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
                            Status: {data.status.replace(/[^\p{L}\p{N}\p{Z}]/gu, ' ')}
                        </p>
                        <p>
                            Dentist: {data.dentist_id.replace(/[^\p{L}\p{N}\p{Z}]/gu, ' ')}
                        </p>
                        <p>
                            Type : {data.procedure_name.replace(/[^\p{L}\p{N}\p{Z}]/gu, ' ')}
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

export default AppointmentAccordion;

// <div className='btn btn-success'>Book Now!</div>