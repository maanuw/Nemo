import '../css/ReceptionTable.css';
import ReceptionAppointments from "./ReceptionAppointments";


function ReceptionAppTable({data}){


    return (
        <div className="rec-scrollable-div">
        <table className="table table-info table-striped table-hover">
            <tbody>
                <tr>
                    <th>Appointment Type</th>
                    <th>Patient</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Dentist Name</th>
                    <th>Edit</th>

                </tr>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <ReceptionAppointments data={item}/>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )

}

export default ReceptionAppTable;