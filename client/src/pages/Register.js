import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        apartment_no: "",
        street_name: "",
        city: "",
        postal_code: "",
        province: "",
        dob: "",
    });

    const { first_name, last_name, username, email, password, apartment_no, street_name, city, province, postal_code, dob } = inputs;   
    const age = 22;
    const can_reg = 1;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const name = {first_name, last_name};
            const address = {apartment_no, street_name, city, province, postal_code}
            const body = {name, username, email, password, address, dob, age, can_reg};
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Regisetered successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
                
            }


        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Fragment>
            <div className="container">
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <div className="input-group">
                    <span className="input-group-text" id="inputGroup-sizing-sm">First name | Last name</span>
                    <input type="text" name="first_name" placeholder="First Name" className="form-control" value={first_name} onChange={e => onChange(e)} />
                    <input type="text" name="last_name" placeholder="Last Name" className="form-control" value={last_name} onChange={e => onChange(e)} />
                </div>
                <input type="text" name="username" placeholder="Username" className="form-control my-3" value={username} onChange={e => onChange(e)} />
                <input type="email" name="email" placeholder="E-mail" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <div className="input-group">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Address</span>
                    <input type="text" name="apartment_no" placeholder="Apt no." className="form-control" value={apartment_no} onChange={e => onChange(e)} />
                    <input type="text" name="street_name" placeholder="Street name" className="form-control" value={street_name} onChange={e => onChange(e)} />
                    <input type="text" name="city" placeholder="City" className="form-control" value={city} onChange={e => onChange(e)} />
                    <input type="text" name="province" placeholder="Province" className="form-control" value={province} onChange={e => onChange(e)} />
                    <input type="text" name="postal_code" placeholder="Postal Code " className="form-control" value={postal_code} onChange={e => onChange(e)} />
                </div>
                <input type="text" name="dob" placeholder="Date of Birth" className="form-control my-3" value={dob} onChange={e => onChange(e)} />
                <div className="d-grid gap-1">
                    <button className="btn btn-success btn-block btn-padding-x-sm:10px">Submit</button>
                </div>
            </form>
            <Link to="/login">Login</Link>
            </div>
        </Fragment>
    );
};

export default Register;