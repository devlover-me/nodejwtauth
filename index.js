const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey="secretKey";
app.get('/',function(req,res){
    res.json({
        message :" a apis",
    });
});

app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"admin@gmail.com",
        email:"demo@hdhd"
}
jwt.sign({user},secretKey,{expiresIn:'300s'},(error,token)=>{
res.json({
    token
});
});
})

app.post("/profile",verifyT,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authdtat)=>{
    if(err) res.send({result:"invalid token"})
        res.json({
    message:"Profile",
data:authdtat})
})
});
function verifyT(req,res,next){

const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
const brerer = bearerHeader.split(" ");
const token = brerer[1];
req.token = token;
next();
}else{
    res.send({
        result :"Token is not valid"
    })
}
}
app.listen(5000,()=>{
    console.log("app is runung");
});