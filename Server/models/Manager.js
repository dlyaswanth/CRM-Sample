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
    Customers:{
        type:[],
    },
    managerReviews:{
        type:[],
    },
    reviews:{
        type:String,
        default:"0",
    },
    aboutReview:{
        type:[],
    }
})
mongoose.model("Manager",userSchema);