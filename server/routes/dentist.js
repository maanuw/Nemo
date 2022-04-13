const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/myAppointments", authorization, async (req, res)=>{
    try {
        dentist_id = req.user;
        const appointments = await pool.query("SELECT * FROM appointments WHERE dentist_id = $1", [
            dentist_id
        ]); 
        //console.log(branches.rows);
        res.json(appointments.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;