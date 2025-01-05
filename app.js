const express=require("express");
const cookieparser=require("cookie-parser");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const ejs=require("ejs");
const app=express();

const userModel=require("./models/user");
const postModel=require("./models/posts");

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views","./view");

app.get("/",(req,res)=>{
    console.log("Home");
    return res.render("home");
});

app.post("/create", (req,res)=>{
    let {userName,email,password,age}=req.body;

    bcrypt.hash(password, 10, async function(err, hash) {
        let createdUser=await userModel.create(
            {
                userName,
                email,
                password:hash,
                age
            }
        )
        console.log(createdUser);

        let token=jwt.sign({email},"Secret");
        res.cookie("token",token);


        res.redirect("/");
    });

    
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async (req,res)=>{

    const {email,password}=req.body;

    const user=await userModel.findOne({email});
    console.log(user);

    if(!user) return res.send("Invaild Creadientails");

    bcrypt.compare(password,user.password,(err,result)=>{
        if (result){
            const token=jwt.sign({email:user.email},"Secret");
            res.cookie("token",token);
            res.send ("You can login");
        }

        else res.send ("You can't login");

    });
    // if(!isCorrect) return res.send("Invaild Creadientails");
    // res.redirect('/login');

})

app.get("/logout",(req,res)=>{

    res.cookie("token","");
    res.redirect("/")
})



app.listen(8001,()=>{
    console.log("Server is ready to start");
})