const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        reqiured:true
    },
    Manager:{
        type:String,
        required:true,
    },
    customerReview:{
        type:[],
    },
    messages:{
        type:[],
    },
})
mongoose.model("Customer",userSchema);