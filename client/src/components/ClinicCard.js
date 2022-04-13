import React, { Fragment, useState, useEffect } from "react";
import logo from '../assets/Shop.png';
import location from '../assets/location.png';
import phone from '../assets/phone.png';
import '../css/ClientCard.css';
import {Link} from "react-router-dom";


function ClinicCard({data}){
        //fetch data
        
    
    return (


        <div class="branch">

        <div class="card text-center cardAttr">
                 <div class="card-header ">
                     <h3 class="clinicName">{data.branch_name} </h3>

                 </div>
      
                 <div class="card-body">
                   <img src={logo}/>
                     <div class="location">
                     </div>

                     <div class="branchAttribute">
                     <img class="sidelogo"src={location}/>
                        <p>Location: </p> 
                     <h5 class="card-title">{data.address}</h5>
                     </div>
                     
                     <div class="branchAttribute">
                     <img class="sidelogo" src={phone}/>
                         <p>Phone Number:</p>
                     <p class="card-text">{data.phone_number} </p>
                     </div>
                    
                     
                     <Link className="btn btn-primary"
                            to={{
                                pathname: "/login/"+data.branch_id,
                                state: {
                                    branch :data.branch_id,
                                    setAuth: false
                                }
                            }}>
                         Select Branch
                    </Link>
                 </div>
             </div>
      </div>
    )
}

export default ClinicCard;
