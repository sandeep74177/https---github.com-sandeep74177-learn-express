

const express = require('express');
// const fs = require('fs');

const PORT = 5050;

const app = express();

app.use(express.json());

app.use(logger);


app.get("/", (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
    res.json({ message: "Hey Everone!" });
});


//import student middleware
const studentRouter=require('./routes/students');
app.use('/students',studentRouter);

function logger(req,res,next){
    console.log(req.method);
    console.log(req.url);
    next();
}


app.listen(PORT);