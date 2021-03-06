const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/", authorization, async (req, res)=>{
    try {
        user_id = req.user;
        const admin = await pool.query("SELECT * FROM users WHERE user_id=$1", [
            user_id
        ]); 
        res.json(admin.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addTreatment", authorization, async (req, res)=>{
    try {
        const{ medication_body, symptoms, teeth_info, more_comments, treatment_name, more_link} = req.body;
        const admin = await pool.query("INSERT INTO treatments (medication_body, symptoms, teeth_info, more_comments, treatment_name, more_link) VALUES ($1, $2, $3, $4, $5, $6)", [
            medication_body,
            symptoms,
            teeth_info,
            more_comments,
            treatment_name, 
            more_link
        ]); 
        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/getAllDentists", authorization, async (req, res)=>{
    try {
        const {branch_id} = req.body;
        console.log(req.body);
        const admin = await pool.query("SELECT * FROM users WHERE user_role=$1 AND branch_id=$2", [
            "dentist",
            branch_id
        ]);
        //console.log(admin.rows);
        
        res.json(admin.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/getAllPatients", authorization, async (req, res)=>{
    try {
        const{ branch_id } = req.body;
        const patients = await pool.query("SELECT * FROM users WHERE user_role=$1 AND branch_id=$2", [
            "patient",
            branch_id
        ]);
        //console.log(branches.rows);
        res.json(patients.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/addDentist", authorization, async (req, res)=>{
    try {
        const{ user_name } = req.body;
        const admin = await pool.query("UPDATE users SET user_role = $1 WHERE user_name = $2", [
            "dentist",
            user_name
        ]);
        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/addProcedure", authorization, async (req, res)=>{
    try {

        //get corresponding treatment rows for treatment ids
        const{ treatment_name, procedure_description, procedure_name, amount } = req.body;
        //console.log(treatment_name);
        const treatment = await pool.query("SELECT * FROM treatments WHERE treatment_name = $1", [
            treatment_name
        ]);

        const treatment_id = treatment.rows[0].treatment_id;
        //console.log(treatment_id);

        //insert procedures into database.
        const procedure = await pool.query("INSERT INTO appointment_procedures (treatment_id, procedure_description, procedure_name) VALUES ($1, $2, $3) RETURNING *", [
            treatment_id,
            procedure_description,
            procedure_name
        ]);

        procedure_id = procedure.rows[0].user_id
        
        //insert fees.
        const fees = await pool.query("INSERT INTO fee (procedure_id, amount) VALUES ($1, $2)", [
            procedure_id,
            amount,
        ]);

        //console.log(branches.rows);
        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;