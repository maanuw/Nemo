const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/", authorization, async (req, res)=>{
    try {
        const branches = await pool.query("SELECT * FROM branches"); 
        //console.log(branches.rows);
        res.json(branches.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;