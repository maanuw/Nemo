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


router.get("/appointments", authorization, async (req, res)=>{
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

router.post("/dentists", authorization, async (req, res)=>{
    try {
        const {d_id} = req.body;
        console.log(d_id);
        const dentists = await pool.query("SELECT * FROM dentists WHERE d_id=$1", [
            d_id
        ]); 
        //console.log(dentists.rows);
        res.json(dentists.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/all-dentists", authorization, async (req, res)=>{
    try {
        const dentists = await pool.query("SELECT * FROM dentists"); 
        //console.log(dentists.rows);
        res.json(dentists.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;