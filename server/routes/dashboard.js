const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/", authorization, async (req, res)=>{
    try {
        let patient = new Patient(req.user);
        //console.log(await patient.getProfile());
        res.json(await patient.getProfile());
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/treatments", authorization, async (req, res)=>{
    try {
        const treatments = await pool.query("SELECT * FROM treatments");
        res.json(treatments.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/profile", authorization, async (req, res)=>{
    try {
        const treatments = await pool.query("SELECT * FROM treatments");
        res.json(treatments.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/role", authorization, async (req, res)=>{
    try {
        const user_id = req.user;
        const role = await pool.query("SELECT * FROM users WHERE user_id=$1",[
            user_id
        ]);
        res.json(role.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;