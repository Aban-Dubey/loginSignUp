import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/user-routes.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users",router);

const mongo_uri = process.env.MONGOURI;

mongoose.connect(mongo_uri)
.then(()=>console.log("Database connection successful!"))
.catch((err)=>console.log(err));

app.get("/", (req,res)=>{
    res.render("home");
});
app.get("/login", (req,res)=>{
    res.render("login");
});

app.get("/register", (req,res)=>{
    res.render("register");
});

app.get("/reset", (req,res)=>{
    res.render("reset");
});

app.get("/logout", (req,res)=>{
     res.redirect("/");
});

app.get("/secrets", async function(req,res){
    res.render("secrets");
});

app.listen(port,()=>{
    console.log("Server is running on port: "+port);
});