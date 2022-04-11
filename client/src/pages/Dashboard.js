import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AvailableTreatments from "../components/TreatmentsCarousel";


const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name);

        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        getName()
    }, [])

    return (
    <Fragment>
        <Navbar setAuth={setAuth}/>
        <div className="container">
            <h1>Welcome {name}!</h1>
            <div className="container">
                <hr/>
                <h2>Available Treatments</h2>
                <hr/>
                <AvailableTreatments />
            </div>
            <hr/>
        </div>
    </Fragment>
    );
};

export default Dashboard;