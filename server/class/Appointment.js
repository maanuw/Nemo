const pool = require("../db");

class Appointment{
    /**
     * constructor
     * @param {*} user_id 
     */
    constructor(id){
        //Make a db qeury to get Patient info.
        this.user_id = id;
    }

    createAppointment(patient_id, date, ){

    }
}
