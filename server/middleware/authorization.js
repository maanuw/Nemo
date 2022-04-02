const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res, next) => {
    try{
        //Destructure the request body to get token value.
        const jwtToken = req.header("token");

        if (!jwtToken){
            return res.status(403).json("Not Authorized");
        }

        //if token verified , below function is going to return a payload that we can use within our routes.
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
        req.user = payload.user;

        next();
    }catch (error){
        console.error(error.message);
        return res.status(403).json("Not Authorized!");
    }
};