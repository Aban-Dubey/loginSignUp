import User from "../model/user.js";
import bcrypt from "bcryptjs"; //for more details visit notes.txt
import nodemailer from "nodemailer";

export const signUpUser = async(req,res,next)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error);
        return(error);
    }
    if(existingUser) {
        return res.status(400).json({message: "User already exists! Login instead."});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User(
        {
            email: email,
            password: hashedPassword,
        }
    );
    try {
        await user.save();
    } catch (error) {
        console.log(error);
        return(error);
    }
    return res.redirect("/secrets");
};

export const loginUser = async(req,res,next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error);
        return(error);
    }
    if(!existingUser) {
       return res.status(404).json({message: "User does not exist! Sign Up instead."});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); //Since we have stored an encrypted password using bcryptjs, so the comparison will not be like usual string as well.
    if(!isPasswordCorrect) {
       return res.status(400).json({message:"Incorrect password!"});
    }
    return res.redirect("/secrets");
};

export const sendMail = async(req,res) => {
    console.log(req.body);
    const email = req.body.email;
    let testAccount = await nodemailer.createTestAccount();

    //connect with smtp
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "laurence.stroman34@ethereal.email",
            pass: "Pq5gusah9eSbqAttZ7",
        },
    });

    let info = await transporter.sendMail({
    from: '<loginSignUp@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Password Reset OTP", // Subject line
    text: "123456", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    res.json({message: "OTP sent to the entered email"});
};