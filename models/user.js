const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/AuhTestApp-2");

const userScheme=new mongoose.Schema({
    userName: String,
    email: String,
    age: Number,
    posts: Array
});


module.exports= mongoose.model("users",userScheme);