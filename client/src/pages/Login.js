import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) =>  {
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Logged in successfully");
            }else{
                setAuth(false);
                toast.error(parseRes);
            }

            
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <div className="container">
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="E-mail" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <div className="d-grid gap-1">
                    <button className="btn btn-success btn-block btn-padding-x-sm:10px">Submit</button>
                </div>
            </form>
            <Link to="/register">Register</Link>
            </div>
        </Fragment>
    );
};

export default Login;