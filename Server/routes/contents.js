const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Manager = mongoose.model('Manager');
router.post('/getCustomers', async (req,res)=>{
    Manager.find({email:req.body.email})
    .then(result=>{
        res.send(result[0].Customers)
    })
})
router.post('/getReview', async (req,res)=>{
    Manager.find({email:req.body.email})
    .then(result=>{
        res.send(result[0].reviews)
    })
})
router.post('/getlog',async(req,res)=>{
    Manager.findOne({email:req.body.email})
    .then(result=>{
        res.send(result.managerReviews);
    })
    
})
router.post('/getReviews',async(req,res)=>{
    Customer.find({email:req.body.email})
    .then(result=>{
        console.log(result[0].customerReview)
        res.send(result[0].customerReview);
    })
})
router.post('/postReview',async (req,res)=>{
    let manager;
    Customer.findOneAndUpdate({ email: req.body.email }, {
        $push: { customerReview: { "name": req.body.name, "message": req.body.message } }
    }, {
        new: true,
    })
        .exec((err, result) => {
            //console.log('Review Posted');
        })
    await Customer.findOne({email:req.body.email})
    .then(res=>{
        manager=res.Manager;
    })
    console.log(manager);
    Manager.findOneAndUpdate({ name: manager }, {
        $push: { aboutReview: { "name": req.body.name, "message": req.body.message } }
    }, {
        new: true,
    })
        .exec(res => {
            console.log('Review Posted');
        })
    res.status(201).json({message:"Posted !"});
})
router.post('/getManReviews',async(req,res)=>{
    Manager.findOne({email:req.body.email})
    .then(result=>{
        console.log(result.aboutReview);
        res.send(result.aboutReview);
    })
})
router.post('/createlog',async(req,res)=>{
    const {email,name,message}=req.body;
    Manager.findOneAndUpdate({email:email},{
        $push:{managerReviews:{"name":name,"message":message}}
        },{
            new:true,
        })
        .exec((err,result)=>{
            console.log('Saved');
        })
    res.status(201).json({message:'Saved Successfully'})
})
router.post('/sendMessage', async (req,res)=>{
    const {email,message}=req.body;
        Customer.findOneAndUpdate({"email":email}, {
            $push: { messages: { "message": message} }
        }, {
            new: true
        })
        .exec((err, result) => {
           console.log('Pushed');
        })
    return res.status(201).json({ message: 'Message sent successfully !' });
})
router.post('/getMessages',async(req,res)=>{
    await Customer.find({email:req.body.email})
    .then(result=>{
        res.send(result[0].messages);
    })
})
router.post('/review',async(req,res)=>{
    let manager;
    var rating=req.body.review;
    console.log(rating)
    await Customer.find({email:req.body.email})
    .then(result=>{
        manager=result[0].Manager;
    })
    await Manager.findOneAndUpdate({"name":manager},{
        $set:{"reviews":rating}},
        {
            new:true,
        })
        .exec((err,result)=>{
            res.status(201).json({message:"Posted"});
        })
})
module.exports=router;