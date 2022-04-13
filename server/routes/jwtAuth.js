const { reset } = require("nodemon");
const { Pool } = require("pg");
//Routers help us use routes in a modular way. 
const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


/**
 * Registration
 */
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req. body (name, email, username, address, password, dob, etc)
        const {name, username, email, password, address, dob, age, can_reg, branch_id} = req.body;

        const role = "patient";
        //2. check if user exists (if user exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE use_email = $1 AND branch_id = $2", [
            email,
            branch_id
        ]);
        if (user.rows.length !== 0){
            console.log(user.rows.length);
            return res.status(401).json("user already exists!");
        }

        //3. Bcrypt the user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const brcyptPassword = await bcrypt.hash(password, salt);

        //4. enter thee user inside our db
        const newUser = await pool.query("INSERT INTO users (user_name, use_email, user_password, u_name, user_address, user_dob, age, can_register, user_role, branch_id) VALUES ($1, $2, $3, jsonb_populate_record(null:: u_name, $4), jsonb_populate_record(null::address, $5), $6, $7, $8, $9, $10) RETURNING *", [username, email, brcyptPassword, name, address, dob, age, can_reg, role, branch_id]);

        //5. generating the jwt.token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

/**
 * Login
 */
router.post("/login", validInfo, async (req, res) => {
    try {
        // step 1. destructure
        const {email, password, branch_id} = req.body;
        console.log(branch_id);
        //step2. check if user doesnt exist, if not throw error
        const user = await pool.query("SELECT * FROM users WHERE use_email = $1 AND branch_id = $2", [
            email,
            branch_id
        ]);
        if (user.rows.length === 0){
            return res.status(401).json("Password, email or branch incorrect!");
        }

        //step3. check if incooming password same as db password.
        //returns boolean password.
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword){
            return res.status(401).json("Incorrect Passsword");
        }

        //step4. give use jwt token.
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    } 
});

/**
 * Authorization
 */
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }

});
/**
 * Note: Neeed to check if this age function should be here.
 * @param {*} p2 
 * @returns 
 *
function age(, p2) {
    return p1 * p2;   // The function returns the product of p1 and p2
  }
*/
module.exports = router;