import React, {  useState, useEffect } from "react";
import '../css/AdminTable.css';
import AppointmentPopup from "./DentistAppointmentPopup";


function ListOfDentists({data}){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);

    const [dentists, setDentists] = useState([]);
    async function getDentists(branch) {
        try {
            const branch_id = await fetch("http://localhost:3001/branch/myBranchId", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const branchRes = await branch_id.json();
            const response = await fetch("http://localhost:3001/admin/getAllDentists", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    branch_id: branchRes.branch_id})
            });
            const parseRes = await response.json();
            setDentists(parseRes);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDentists()
    }, [])

    return (
        <div className="admin-scrollable-div">
        <table className="table table-info table-striped table-hover">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Edit</th>

                </tr>
                {dentists.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.u_name}</td>
                            <td>{item.user_id}</td>
                            <td><AppointmentPopup data={item}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )

}

export default ListOfDentists;