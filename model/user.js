const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        
        min:5,
        max:255
    },
    email:{
        type:String,
        
        min:5,
        max:255
    },
    password:{
        type:String,
        
        min:5,
        max:1024
    },
    date:{
        type:String,
        default:Date.now,
    },
});

module.exports = mongoose.model('user',UserSchema);