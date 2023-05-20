const  router = require("express").Router();

const  bcrypt=require("bcryptjs");  // for hashed password creation


const User = require("../model/user");
const { registervalidation,loginvalidation } = require("../validation");

const jwt = require("jsonwebtoken");

router.get("/",(req, res)=>{
    res.send("inside the user");
});

 
router.post("/register",async(req,res)=>{



const {error}= registervalidation(req.body);
if(error)return res.status(400).send(error.details[0].message);

//check the user already exists

const  emailexist =await User.findOne({email : req.body.email});
if(emailexist)return res.status(400).send("email already exist");





 const salt= await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(req.body.password,salt);

    const user = new User({
       name  : req.body.name,
        email : req.body.email,
        password :hashedpassword ,
    });
    console.log(req.body);
    try {
       const saveUser = await user.save();
       res.status(200).send({success: true, error: false, message: "User registration completed",
       user:saveUser });
        
    } catch (err) {
        res.status(400).send({staus : "Failed", msg : err});
    }
    
    });

    //login

    router.post("/login",async (req,res)=>{

//validate user email
        const{error} =loginvalidation(req.data);
        if(error) return res.status(400).send(error.details[0].message);

     //check user email   
        const  user =await User.findOne({email : req.body.email});
        if(!user) return res.status(400).send("invalid email");

        //check user password 
        const validpass = await bcrypt.compare(req.body.password,user.password);
        if(!validpass) return res.status(400).send("invalid password");


        //creating a token
        const token = jwt.sign({_id :user._id},"adfdhjviyitbk1452fdy");
        //res.send(token);
        res.header("auth-token",token).send(user);


    });
module.exports=router;