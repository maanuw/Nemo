import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AvailableTreatments from "../components/TreatmentsCarousel";
import AppointmentsCard from "../components/AppointmentsCard";
import DentistDashboard from "./DentistDashboard";
import ReceptionDashboard from "./ReceptionDashboard";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [branchid, setBranchid] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name);
            setRole(parseRes.user_role);
            setBranchid(parseRes.branch_id);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        getName()
    }, "")


    if (role === "dentist") {
        return (
            <DentistDashboard setAuth={setAuth}/>
        );
    } else if(role === "reception_emp" ){
        return (
            <ReceptionDashboard setAuth={setAuth}/>
        );
    }
    else if (role === "patient") {
        return (

            <Fragment>
                <Navbar setAuth={setAuth} />
                <div className="container">
                    <h1>Welcome {name}!</h1>
                    <div className="container">
                        <AppointmentsCard />
                        <hr />
                        <h2>Available Treatments</h2>
                        <hr />
                        <AvailableTreatments />
                    </div>
                    <hr />
                </div>
            </Fragment>
        );
    }
    return (
        <Fragment>
            Loading
        </Fragment>
    );

};

export default Dashboard;