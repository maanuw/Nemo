/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Record from './Record';
import Invoice from './Invoice';
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function HistoryPopup({data}) {

    return (
        <Popup trigger={<button className="btn btn-success"> View </button>} modal>
            <div className="tab-container">
                <Tabs defaultActiveKey="planet" id="uncontrolled-tab-example">
                    <Tab eventKey="planet" title="Appointment Record">
                        <Record data={data} />
                    </Tab>
                    <Tab eventKey="list" title="Invoice">
                        <Invoice data={data} />
                    </Tab>
                </Tabs>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </Popup>
)};

export default HistoryPopup;