const mongoose=require("mongoose");


const postScheme=new mongoose.Schema({
    postData: String,
    user: String,
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports= mongoose.model("posts",postScheme);