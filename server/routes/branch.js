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

router.post("/reviews", async (req, res)=>{
    try {
        const branch = req.body;
        console.log(req.body);
        //const branch_id = await pool.query("SELECT branch_id FROM users WHERE user_id=$1" [
        //    user_id
        //])
        const branch_id = branch.branch_id
        console.log(branch.branch_id);
        const reviews = await pool.query("SELECT * FROM branch_reviews AS b INNER JOIN users as u ON u.user_id=b.user_id WHERE b.branch_id=$1", [
            branch_id
        ]); 
        console.log(reviews.rows);
        res.json(reviews.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});



router.post("/writeReview",authorization, async (req, res)=>{
    try {
        const {review_comments, date_posted} = req.body;
        const user_id = req.user;
        const branch_id = await pool.query("SELECT branch_id FROM users WHERE user_id=$1", [
            user_id
        ])
        const reviews = await pool.query("INSERT INTO branch_reviews (branch_id, user_id, date_posted, review_comments) VALUES ($1, $2, $3, $4)", [
            branch_id.rows[0].branch_id,
            user_id,
            date_posted,
            review_comments
        ]); 

        const state = "Success";
        res.json({state});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;