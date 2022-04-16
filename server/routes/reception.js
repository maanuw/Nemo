const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.post("/update",authorization ,async (req, res)=>{
    try {
        const { status, appt_start_time, appointment_date, appointment_id, dentist_id } = req.body;
        console.log(req.body);
        const invoice = await pool.query("UPDATE appointments SET status = $1, appt_start_time = $2, appointment_date = $3, dentist_id=$4 WHERE appointment_id = $5", [
            status,
            appt_start_time,
            appointment_date,
            dentist_id,
            appointment_id
        ]); 
        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

/*
router.post("/update",authorization ,async (req, res)=>{
    try {
        const { status, appt_start_time, appointment_date, appointment_id, dentist_id } = req.body;
        console.log(req.body);
        const invoice = await pool.query("UPDATE appointments SET status = $1, appt_start_time = $2, appointment_date = $3, dentist_id=$4 WHERE appointment_id = $5", [
            status,
            appt_start_time,
            appointment_date,
            dentist_id,
            appointment_id
        ]); 
        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});
*/
module.exports = router;