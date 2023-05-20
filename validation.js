
//@hapi/joi...package used for verification
const joi = require("@hapi/joi");
const { Schema } = require("mongoose");


//register validation
const registervalidation =(data)=>{
    const schema =joi.object({
        name : joi.string().min(5),
        email : joi.string().min(5).email(),
        password : joi.string().min(5)
    });
    return schema.validate(data);
};

//login vallidation
const loginvalidation = (data)=>{
    const schema=joi.object({
        email: joi.string().min(5).email(),
        password : joi.string().min(5),
    });
    return schema.validate(data);
};

module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;