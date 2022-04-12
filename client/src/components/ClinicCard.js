import React, { Fragment, useState, useEffect } from "react";

function AppointmentsCard(){
    //Code to query the backend.
    const [data, setTreatments] = useState([]);

    async function getTreatments() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/branch/info", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setTreatments(parseRes);
    
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTreatments()
    }, [])

    //

    return (
        <div class="card text-center">
            <div class="card-header">
                Clinic.
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
    )
}

export default AppointmentsCard;

/**
 * <Button variant="primary">Book Appointment</Button>
 */