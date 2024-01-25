import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"email field can't be empty!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password field can't be empty!"],
        minlength: 6
    }
});

export default mongoose.model("User",userSchema); //This will create a collection with name: users