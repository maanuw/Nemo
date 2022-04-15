/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import HistoryPopup from './DentistHistoryPopup';
import "bootstrap/dist/css/bootstrap.min.css";
import DentistAppointmentPopup from './DentistAppointmentPopup';


function DentistHistoryPopup({data}) {

    return (
        <>
        <DentistAppointmentPopup data={data}/>
        </>
)};

export default DentistHistoryPopup;