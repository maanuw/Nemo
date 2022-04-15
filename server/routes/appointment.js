const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.post("/", authorization, async (req, res)=>{
    try {
        const {treatmentid, date, time, appointment_type, status} = req.body;
        const patient_id = req.user;
        const dentist_id = "null";
        const appointment = await pool.query("INSERT INTO appointments (treatment_id, patient_id, dentist_id, appointment_date, appt_start_time, appointment_type, status) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
            treatmentid,
            patient_id,
            dentist_id,
            date,
            time,
            appointment_type,
            status
        ]);

        //console.log(response);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}); 

router.post("/upcoming", authorization, async (req, res) => {
    try {
        const {branch_id} = req.body;
        const patient_info = await pool.query("SELECT * FROM appointments AS aa INNER JOIN users AS u ON u.user_id=aa.patient_id INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id INNER JOIN dentists AS d ON d.d_id=aa.dentist_id WHERE u.branch_id=$1",[
            branch_id
        ]);

        res.json(patient_info.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/history", authorization, async (req, res)=>{
    try {

        const patient_id = req.user;
        const appointment = await pool.query("SELECT * FROM appointments AS aa INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id INNER JOIN dentists AS d ON d.d_id=aa.dentist_id WHERE aa.patient_id=$1 AND (aa.status=$2 OR aa.status=$3 OR aa.status=$4 OR aa.status=$5);", [
            patient_id,
            "cancelled",
            "completed",
            "no-show",
            "reschedule"
        ]);

        res.json(appointment.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}); 

router.get("/myAppointments", authorization, async (req, res)=>{
    try {

        const patient_id = req.user;
        const appointment = await pool.query("SELECT * FROM appointments AS aa INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id INNER JOIN dentists AS d ON d.d_id=aa.dentist_id WHERE aa.patient_id=$1 AND aa.status=$2", [
            patient_id,
            "scheduled"
        ]);

        res.json(appointment.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}); 

router.post("/cancel", authorization, async (req, res)=>{
    try {

        const {status, appointment_id} = req.body;
        console.log(req.body);
        const appointment = await pool.query("UPDATE appointments SET status = $1 WHERE appointment_id = $2", [
            status,
            appointment_id,
        ]);
        console.log(appointment);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}); 

router.post("/update", authorization, async (req, res)=>{
    try {

        const {status, appt_start_time, appointment_date, appointment_id} = req.body;
        console.log(appointment_date);
        const appointment = await pool.query("UPDATE appointments SET status = $1, appt_start_time = $2, appointment_date = $3 WHERE appointment_id = $4", [
            status,
            appt_start_time,
            appointment_date,
            appointment_id
        ]);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}); 
module.exports = router;