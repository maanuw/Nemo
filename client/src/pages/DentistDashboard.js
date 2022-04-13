import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";


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
        <Navbar setAuth={setAuth}/>
        <div className="container">
            <h1>Dentist-Portal {name}</h1>
            
        </div>
    </Fragment>
    );
};

export default DentistDashboard;