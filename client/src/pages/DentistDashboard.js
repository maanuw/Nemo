import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/DentistAppTable";
import History from "../components/DentistHistoryTable";

const DentistDashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name)

        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        getName()
    }, "")

    return (
        <Fragment>
            <Navbar setAuth={setAuth} />
            <div className="container my-3">
                <h1>Hello Dr. {name}</h1>
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
            </div>
        </Fragment>
    );
};

export default DentistDashboard;