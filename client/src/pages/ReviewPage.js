import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom"
//import "../css/Feedback.css"
import logo from "../assets/feedbackCard.png";


const ReviewPage = ({ setAuth }) => {
    const today = new Date();
    const date_posted = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('token', localStorage.token);
    const location = useLocation();
    const myArray = location.pathname.split("/");
    const branch_id = myArray[2];

    const [inputs, setInputs] = useState({
        review_comments: "Your comments...",
    });

    const { review_comments } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); //on clicking submit by default it refreshes the page. but the statement on the left prevents this behaviour
        try {
            const body = { review_comments, date_posted };
            const response = await fetch("http://localhost:3001/branch/writeReview", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (parseRes.state) {
                toast.success("Review posted successfully");
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
                <h1 className="text-center my-5">Your feedback is appreciated!</h1>
                <form onSubmit={onSubmitForm}>
                    <div className="mb-3">
                        <div className="card container">
                            <h1 className="text-center my-5">Give Feedback <img src={logo} /></h1>
                            <p>Do you have any thought you'd like to share?</p>
                            <input type="text" id="comment" placeholder={review_comments} className="form-control" name="review_comments" value={review_comments} onChange={e => onChange(e)} />
                            <button className="btn btn-success btn-block btn-padding-x-sm:10px">Submit</button>
                            <button className="btn btn-secondary" id="cancel">CANCEL</button>

                        </div>
                    </div>
                </form>

                <Link
                    to={{
                        pathname: "/login/" + branch_id,
                        state: {
                            branch: branch_id,
                            setAuth: false
                        }
                    }}>
                    Home
                </Link>
            </div>
        </Fragment>
    );
};

export default ReviewPage;