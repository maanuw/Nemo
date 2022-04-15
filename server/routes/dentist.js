const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/myAppointments", authorization, async (req, res)=>{
    try {
        dentist_id = req.user;
        //console.log(req.user);
        const appointments = await pool.query("SELECT * FROM appointments AS aa INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id INNER JOIN users AS u ON u.user_id=aa.patient_id WHERE aa.dentist_id=$1 AND aa.status=$2", [
            dentist_id,
            "scheduled"
        ]); 
        //console.log(appointments.rows);
        res.json(appointments.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/note", authorization, async (req, res)=>{
    try {
        const {status, doc_comments, appointment_id} = req.body;
        const note = await pool.query("UPDATE appointments SET status = $1, doc_comments = $2 WHERE appointment_id = $3", [
            status,
            doc_comments,
            appointment_id
        ]); 
        //console.log(note.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/history", authorization, async (req, res)=>{
    try {

        const dentist_id = req.user;
        const appointment = await pool.query("SELECT * FROM appointments AS aa INNER JOIN appointment_procedures AS ap ON aa.appointment_type=ap.procedure_id INNER JOIN treatments AS t ON aa.treatment_id=t.treatment_id INNER JOIN users AS u ON u.user_id=aa.patient_id WHERE aa.dentist_id=$1 AND (aa.status=$2 OR aa.status=$3 OR aa.status=$4 OR aa.status=$5);", [
            dentist_id,
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

module.exports = router;