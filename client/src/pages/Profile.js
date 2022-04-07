import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";


const Profile = ({ setAuth }) => {

    const [name, setName] = useState("");
		const [address, setAddress] = useState("");
		const [email, setEmail] = useState("");
		const [birthday, setBirthday] = useState("");
		const [id, setID] = useState("");
		const [role, setRole] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.u_name);
						setAddress(parseRes.user_address);
						setEmail(parseRes.use_email);
						setBirthday(parseRes.user_dob);
						setID(parseRes.user_id);
						setRole(parseRes.user_role);

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
				<div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://storage.needpix.com/rsynced_images/dentist-3249382_1280.png"></img><span class="font-weight-bold">{name}</span><span class="text-black-50">{email}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">First name:</label><input type="text" class="form-control" placeholder="Update first name" value=""></input></div>
                    <div class="col-md-6"><label class="labels">Last name:</label><input type="text" class="form-control" value="" placeholder="Update last name"></input></div>
                </div>
                <div class="row mt-3">
										<div class="col-md-12"><label class="labels">Email: {email}</label><input type="text" class="form-control" placeholder="Update email" value=""></input></div><p></p>
                    <div class="col-md-12"><label class="labels">Address: {address}</label><input type="text" class="form-control" placeholder="Update address" value=""></input></div><p></p>
                    <div class="col-md-12"><label class="labels">Birthday: {birthday}</label><input type="text" class="form-control" placeholder="Update birthday" value=""></input></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
								<div class="col-md-12"><label class="labels">User ID: {id}</label></div> <br></br>
								<div class="col-md-12"><label class="labels">Role: {role}</label><input type="text" class="form-control" placeholder="Update role" value=""></input></div> <br></br>
            </div>
        </div>
    </div>
</div>
    </Fragment>
    );
};

export default Profile;
