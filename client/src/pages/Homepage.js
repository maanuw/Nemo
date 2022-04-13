import React, { Fragment, useState, useEffect } from "react";
import Clinic from "../components/ClinicCard";
import homeImg from "../assets/dental.png";
import logo from "../assets/shield.png";
import '../css/Homepage.css';

const Homepage = () => {

    //fetch data
    const [clinicData, setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch("http://localhost:3001/branch/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setData(parseRes);

        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])
    //
    
    return (
    <Fragment>
            <div >
                <div class="d-flex welcome">
                    <div class="p-2 title">
                        <h1 id="welcome">Welcome To <span id="special-title">NEMO DENTIST</span></h1>
                        <p>  <img id="logo"src={logo}/>Pick UP Your Branch To Start Your Journey</p>
                    </div>
                    <div class="p-2"><img  src={homeImg}/></div>
                </div>
                {clinicData.map((item, index) => {
                    return (
                        <div key={index}>
                            <Clinic data={item} />
                        </div>
                    )
                })}
            </div>
            
    </Fragment>
    );
};

export default Homepage;