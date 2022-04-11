import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


function TreatmentAccordion({data}) {
    return (
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        {data.procedure_name}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        {data.procedure_description}
                    </p>
                    <div className='btn btn-success'>Book Now!</div>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default TreatmentAccordion;