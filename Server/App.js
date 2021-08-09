const express = require('express')
const PORT = process.env.PORT || 4201  
const app = express()
const bodyparser = require('body-parser');
const {MONGOURI} = require('./config/keys.js');
const mongoose = require('mongoose')
const path=require('path')
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to dataBase");
})
mongoose.connection.on('error',(error)=>{
    console.log("Error Connecting : ",error);
})
require('./models/Customer')
require('./models/Manager')
require('./models/Admin')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(require('./routes/auth'))
app.use(require('./routes/contents'))
app.use(express.json())
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,'public')));
        app.get("*",(req,res)=>{
            res.sendFile(path.join(__dirname,'public/index.html'))
        })
        }
app.listen(PORT,()=>{
    console.log("Server Running on PORT ",PORT)
})
