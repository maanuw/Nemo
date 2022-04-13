const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const Patient = require("../class/Patient");

router.get("/", async (req, res)=>{
    try {
        const branches = await pool.query("SELECT * FROM branches"); 
        //console.log(branches.rows);
        res.json(branches.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/myBranchId", authorization, async (req, res)=>{
    try {
        const user_id = req.user
        const branches = await pool.query("SELECT branch_id FROM users WHERE user_id=$1", [
            user_id
        ]); 
        //console.log(branches.rows);
        res.json(branches.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;