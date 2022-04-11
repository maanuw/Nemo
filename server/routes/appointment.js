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

module.exports = router;