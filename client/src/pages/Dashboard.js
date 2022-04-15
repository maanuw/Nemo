import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AvailableTreatments from "../components/TreatmentsCarousel";
import DentistDashboard from "./DentistDashboard";
import AdminDashboard from "./AdminDashboard";
import ReceptionDashboard from "./ReceptionDashboard";
import Table from "../components/PatientAppTable";
import History from "../components/PatientHistoryTable";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name);
            setRole(parseRes.user_role);
            
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
    }else if(role === "admin"){
        return(
            <AdminDashboard setAuth={setAuth}/>
        )
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
                    <hr />
                    <div className="container">
                        <div className="row align-items-start">
                            <div className="col">
                                <h2>Upcoming Appointments</h2>
                                <Table />
                            </div>
                            <div className="col">
                                <h2>History</h2>
                                <History />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h2>Available Treatments</h2>
                        <hr />
                        <AvailableTreatments data={role}/>
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
