const pool = require("../db");

class Patient{
    /**
     * constructor
     * @param {*} user_id 
     */
    constructor(id){
        //Make a db qeury to get Patient info.
        this.user_id = id;
    }

    /**
     * @param {*} none
     */
    async getName(){
        try {
            const name = await pool.query("SELECT u_name FROM users WHERE user_id = $1", [
                user_id
            ]);
            res.json(name.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }

    /**
    * @param {*} none
    */
     async getAddress() {
        try {
            const user = await pool.query("SELECT address FROM users WHERE user_id = $1", [
                user_id
            ]);
            res.json(user.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }

    /**
     * @param {*} none
     */
     async getEmail(){
        try {
            const user = await pool.query("SELECT use_email FROM users WHERE user_id = $1", [
                user_id
            ]);
            res.json(user.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }

    /**
     * @param {*} none
     */
     async getDob(){
        try {
            const user = await pool.query("SELECT user_dob FROM users WHERE user_id = $1", [
                user_id
            ]);
            res.json(user.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }

    /**
     * @param {*} none
     */
     async getAge(){
        try {
            const user = await pool.query("SELECT age FROM users WHERE user_id = $1", [
                user_id
            ]);
            res.json(user.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    }

    async getProfile(){
        try {
            const profile = await pool.query("SELECT * FROM users WHERE user_id = $1", [
                this.user_id
            ]);
            return profile.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    //1.Set appointments
    //2.Get appointments
    //3.Select treatment
    //4.Set/Get SSN
    //5.Set/Get phone number
    //6.Set/Get gender
    //7.Set/Get insurance number
    //8.get invoice
    //9.makePayment
    //10.get branch
    // 
}

//getters
module.exports = Patient;