/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState, useEffect, Fragment } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Record from './Record';
import Invoice from './Invoice';
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import "../css/Review.css";
import logo from "../assets/avatar.png";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom"
import '../css/ViewReview.css';

function ReviewsPopup({data}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);
    const location = useLocation();
    const myArray = location.pathname.split("/");
    const branch_id = myArray[2];
    const [reviews, setReviews] = useState([]);
    console.log(data);
    async function getReviews() {
        try {
            const reviewResponse = await fetch("http://localhost:3001/branch/reviews", {
                method: "POST",
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    branch_id : branch_id
                })
            });
            const reviewRes = await reviewResponse.json();
            setReviews(reviewRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getReviews()
    }, [])


    return (
        <Fragment>
            <div className="review-section">
                <div className="title">
                    <h1><b>Branch Reviews</b></h1>
                    <h2>Branch Name</h2>
                </div>
                {reviews.map((item, index) => {
                    return (
                    <div class="card container" key={index}>
                        <p id="user"><img src={logo}/> {item.u_name}</p>
                        <p id="comment-section">{item.review_comments}</p>
                    </div>
                    )
                })}
            </div>
        </Fragment>

    )};

export default ReviewsPopup;