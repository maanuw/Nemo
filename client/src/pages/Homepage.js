import React, { Fragment, useState, useEffect } from "react";
import Clinic from "../components/ClinicCard";

const Homepage = ({setAuth}) => {

    //fetch data
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
    //
    
    return (
    <Fragment>
        <div className="container">
            <h1>Home</h1>
            <Clinic />
        </div>
    </Fragment>
    );
};

export default Homepage;