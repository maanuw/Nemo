require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const app = express();

//------ middleware -------------------//
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//------ User-defined middleware -------//

app.use((req, res, next) => {
  console.log("yeah our middleware ran!");
  next();
})

//------ ROUTES -----------------------//

// Register and login routes.
app.use('/auth', require("./routes/jwtAuth"));

//dashboard routes.
app.use('/dashboard', require("./routes/dashboard"));

//treatment routes.
app.use('/treatment', require("./routes/treatment"));


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}.`);
})