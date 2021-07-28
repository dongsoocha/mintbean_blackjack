const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const passport = require('passport');



mongoose   
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
require('./config/passport')(passport);
app.use("/api/users", users);


const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is running on port ${[port]}`));