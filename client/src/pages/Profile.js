import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";


const Profile = ({ setAuth }) => {

    const [name, setName] = useState("");
		const [address, setAddress] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name);
						setAddress(parseRes.user_address);

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
				<h1>Profile {address}</h1>

        </div>
    </Fragment>
    );
};

export default Profile;
