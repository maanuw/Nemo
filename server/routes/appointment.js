const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.post("/", authorization, async (req, res)=>{
    try {
        const {treatmentid, date, time, appointment_type, status} = req.body;
        const patient_id = req.user;

        const appointment = await pool.query("INSERT INTO appointments (treatment_id, patient_id, appointment_date, appt_start_time, appointment_type, status) VALUES ($1, $2, $3, $4, $5, $6);", [
            treatmentid,
            patient_id,
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
        console.log(branch_id);
        const patient_info = await pool.query("SELECT * FROM appointments AS aa INNER JOIN users AS u ON u.user_id=aa.patient_id INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id WHERE u.branch_id=$1",[
            branch_id
        ]);

        console.log(patient_info.rows);
        res.json(patient_info.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;