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

module.exports = router;