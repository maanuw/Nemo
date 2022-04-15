import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DentistList from "../components/ListOfDentists";
import PatientList from "../components/ListOfPatients";
import AvailableTreatments from "../components/TreatmentsCarousel";

const AdminDashboard = ({ setAuth }) => {

    const [name, setName] = useState([]);

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/admin/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes);
            setName(parseRes)

        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        getName()
    }, [])

    return (
        <Fragment>
            <Navbar setAuth={setAuth} />
            <div className="container my-3">
                <h1>Admin Dashboard {name.u_name}</h1>
                <hr />
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <h2>Dentists</h2>
                            <DentistList data={name}/>
                        </div>
                        <div className="col">
                            <h2>Patients</h2>
                            <PatientList data={name}/>
                        </div>
                    </div>
                    <div className="container">
                        <h2>Available Treatments</h2>
                        <hr />
                        <AvailableTreatments data={name.user_role}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;