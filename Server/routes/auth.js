const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Manager = mongoose.model('Manager');
const Admin = mongoose.model('Admin'); 
const bcrypt = require('bcryptjs');
router.get('/getManagers', async (req,res)=>{
    const users= await Manager.find({})
    let user=[]
    for (let i of users)
    {
        user.push(i.name);
    }
    //console.log(user);
    res.status(200).json(user);
})
router.post('/login',(req,res)=>{
    const {email,password,type}=req.body;
    if (type === 'Admin')
    {
        Admin.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
            return res.send(402).json({error:'Invalid Username or Password !'})
            bcrypt.compare(password,savedUser.password,function(err,result){
                if (result)
                return res.status(202).json({message:"Logged In !"})
                else
                return res.status(401).json({error:"Invalid UserName or Password"});
            })
        })
    }
    else if (type === 'Customer')
    {
        Customer.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
            return res.send(402).json({error:'Invalid Username or Password !'})
            bcrypt.compare(password,savedUser.password,function(err,result){
                if (result)
                return res.status(202).json({message:"Logged In !"})
                else
                return res.status(401).json({error:"Invalid UserName or Password"});
            })
        })
    }
    else if (type === 'Manager')
    {
        Manager.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
            return res.send(402).json({error:'Invalid Username or Password !'})
            bcrypt.compare(password,savedUser.password,function(err,result){
                if (result)
                return res.status(202).json({message:"Logged In !"})
                else
                return res.status(401).json({error:"Invalid UserName or Password"});
            })
        })
    } 
    else 
    {

    }
})
router.post('/signup',async (req,res)=>{
    const {email,password,type,name}=req.body;
    // if (type === 'Admin')
    // {
    //     Admin.findOne({email:email})
    //     .then(savedUser=>{
    //         if (savedUser)
    //         return res.status(401).json({error:'Email Already exists !'})
    //         else
    //         {
    //             bcrypt.hash(password,15,(err,hashedpassword)=>{
    //                 const user=new Admin({
    //                     email,
    //                     name,
    //                     password:hashedpassword,
    //                 })
    //                 user.save()
    //             })
    //             return res.status(201).json({message:'User created Successfully !'});
    //         }
    //     }) 
    // }
    if (type === 'Customer')
    {
        const manager=req.body.manager;
        console.log(manager);
        await Customer.findOne({email:email})
        .then(savedUser=>{
            if (savedUser)
            return res.status(401).json({error:'Email Already exists !'})
            else
            {
                bcrypt.hash(password,15,(err,hashedpassword)=>{
                    const user=new Customer({
                        email,
                        name,
                        Manager:manager,
                        password:hashedpassword,
                    })
                    user.save()
                })
                Manager.findOneAndUpdate({"name":manager}, {
                    $push: { Customers: { "Email": email, "Name": name } }
                }, {
                    new: true
                })
                    .exec((err, result) => {
                        return res.status(201).json({ message: 'User created Successfully !' });
                    })
            }
        })
    }
    else if (type === 'Manager')
    {
        Manager.findOne({email:email})
        .then(savedUser=>{
            if (savedUser)
            return res.status(401).json({error:'Email Already exists !'})
            else
            {
                bcrypt.hash(password,15,(err,hashedpassword)=>{
                    const user=new Manager({
                        email,
                        name,
                        password:hashedpassword,
                    })
                    user.save()
                })
                return res.status(201).json({message:'User created Successfully !'});
            }
        })
    } 
})
module.exports=router;