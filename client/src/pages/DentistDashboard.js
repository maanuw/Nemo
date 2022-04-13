import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DentistAccordion from "../components/DentistAccordion";

const Dashboard = ({ setAuth }) => {

    const [appointments, setAppointments] = useState([]);

    async function getAppointments() {
        try {


            const getAppointmentData = await fetch("http://localhost:3001/dentist/myAppointments", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseAppointment = await getAppointmentData.json();
            console.log(parseAppointment);
            setAppointments(parseAppointment);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    return (
    <Fragment>
        <Navbar setAuth={setAuth}/>
        <div className="container">
            <h1>This is the Dentist-Portal </h1>

              {appointments.map((item, index) => {
                    return (
                        <div key={index}>
                            <DentistAccordion data={item} />
                        </div>
                    )
                })}

        </div>
    </Fragment>
    );
};

export default Dashboard;
