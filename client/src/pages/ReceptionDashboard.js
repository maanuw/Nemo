import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AppointmentAccordion from "../components/AppointmentAccordion";

const ReceptionDashboard = ({ setAuth }) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

    const [branch, setBranch] = useState("");
    const [appointments, setAppointments] = useState([]);
    
    async function getBranch() {
        try {
            const branch = await fetch("http://localhost:3001/branch/myBranchId", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseBranch = await branch.json();
            setBranch(parseBranch);

        } catch (error) {
            console.error(error.message);
        }
    }

    async function getAppointments() {
        try {
            const getAppointmentData = await fetch("http://localhost:3001/appointment/upcoming", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    branch_id: branch.branch_id
                })
            });
            const parseAppointment = await getAppointmentData.json();
            setAppointments(parseAppointment);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getBranch()
    }, "")

    useEffect(() => {
        getAppointments()
    }, []);

    return (
    <Fragment>
        <Navbar setAuth={setAuth}/>
        <div className="container">
            <h1>Reception-Portal </h1>
            {appointments.map((item, index) => {
                    return (
                        <div key={index}>
                            <AppointmentAccordion data={item} />
                        </div>
                    )
                })}
        </div>
    </Fragment>
    );
};

export default ReceptionDashboard;