const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.post("/", authorization, async (req, res)=>{
    try {
        console.log("Heree in treatment");
        const {treatment_name} = req.body;
        console.log(req.body);
        const treatment_id = await pool.query("SELECT treatment_id FROM treatments WHERE treatment_name = $1", [
            treatment_name
        ]);

        const response = await pool.query("SELECT * FROM appointment_procedures WHERE treatment_id = $1", [
            treatment_id.rows[0]["treatment_id"]
        ])
        //console.log(response);
        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;