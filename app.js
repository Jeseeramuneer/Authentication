const express= require ('express');
const app= express();
const mongoose= require('mongoose');
require("dotenv/config");
app.use(express.json());

app.get('/',(req, res)=>{
    res.send("Hello World");
});

const UserRoute = require("./routes/auth");
 app.use("/user",UserRoute);



mongoose.connect(process.env.dbconnection,()=>{
    console.log("connected");
});

app.listen(8000,()=>{
    console.log("listening the port 8000");
});