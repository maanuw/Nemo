import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {toast} from "react-toastify";


function getStringToken(str, index) {
	str = str.replace(/[()"]/g, "").toUpperCase();
	const strArr = str.split(",");
	let targetStr = strArr[index];
	// return strArr[index][0].toUpperCase() + strArr[index].slice(1);
	return targetStr;
}

const Profile = ({ setAuth }) => {
	const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

	const [user, setUser] = useState([]);
/*
	const [inputs, setInputs] = useState({
        name: user.u_name,
        email: user.use_email,
		address: user.user_address,
		birthday: user.user_dob,
    });
*/
   // const { name, email, address, birthday} = inputs;   

/*
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const body = {name, email, address, birthday};
            const response = await fetch("http://localhost:3001/dashboard/profile", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();


        } catch (error) {
            console.error(error.message);
        }
    }
*/
	async function getName() {
		try {
			const response = await fetch("http://localhost:3001/dashboard/", {
				method: "GET",
				headers: { token: localStorage.token }
			});
			const parseRes = await response.json();
			setUser(parseRes);

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
		<form >
		<div class="container rounded bg-white mt-5 mb-5">
			<div class="row">
				<div class="col-md-3 border-right">
					<div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://storage.needpix.com/rsynced_images/dentist-3249382_1280.png"></img><span class="font-weight-bold">{user.u_name} {user.u_name}</span><span class="text-black-50">{user.use_email }</span><span> </span></div>
				</div>
				<div class="col-md-5 border-right">
					<div class="p-3 py-5">
						<div class="d-flex justify-content-between align-items-center mb-3">
							<h4 class="text-right">Profile Settings</h4>
						</div>
						<div class="row mt-2">
							<div class="col-md-6"><label class="labels">First name: </label><input type="text" class="form-control" placeholder={user.u_name} value={user.u_name} /></div>
							<div class="col-md-6"><label class="labels">Last name: </label><input type="text" class="form-control" value={user.u_name} placeholder={user.u_name} /></div>
						</div>
						<div class="row mt-3">
							<div class="col-md-12"><label class="labels">Street name: </label><input type="text" class="form-control" placeholder={user.user_address} value={user.user_address} /></div>
						</div>
						<div class="row mt-2">
							<div class="col-md-6"><label class="labels">Apartment number: </label><input type="text" class="form-control" placeholder={user.user_address} value={user.user_address} /></div>
							<div class="col-md-6"><label class="labels">City: </label><input type="text" class="form-control" value="" placeholder={user.user_address} /></div>
						</div>
						<div class="row mt-2">
							<div class="col-md-6"><label class="labels">Province: </label><input type="text" class="form-control" placeholder={user.user_address} value={user.user_address} /></div>
							<div class="col-md-6"><label class="labels">Postal Code: </label><input type="text" class="form-control" value={user.user_address} placeholder={user.user_address} /></div>
						</div>
						<div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="p-3 py-5">
						<div class="col-md-12"><label class="labels">User ID: {user.user_id}</label></div><br></br>
						<div class="col-md-12"><label class="labels">Role: {user.user_role}</label></div><br></br>
						<div class="col-md-12"><label class="labels">Email: </label><input type="text" class="form-control" placeholder={user.use_email} value={user.use_email} /></div><br></br>
						<div class="col-md-12"><label class="labels">Birthday: </label><input type="text" class="form-control" placeholder={user.user_dob} value={user.user_dob} /></div>
					</div>
				</div>
			</div>
		</div>
		</form>
		</Fragment>
	);
};

export default Profile;
