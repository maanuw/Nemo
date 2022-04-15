const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.post("/",authorization ,async (req, res)=>{
    try {
        const patient_id = req.user;
        const { appointment_id, status, issue_date} = req.body;
        console.log(req.user);
        const invoice = await pool.query("INSERT INTO invoices (appointment_id, patient_id, issue_date, status) VALUES ($1, $2, $3, $4);", [
            appointment_id,
            patient_id,
            issue_date,
            status
        ]); 
        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/getDetails",authorization ,async (req, res)=>{
    try {
        const {appointment_id} = req.body;
        console.log(req.body);
        const invoice = await pool.query("SELECT * FROM invoices WHERE appointment_id=$1", [
            appointment_id,
        ]); 
        console.log(invoice);
        res.json(invoice.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;