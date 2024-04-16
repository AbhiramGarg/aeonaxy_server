import mongoose from "mongoose";
import joi from "joi";
import PasswordComplexity  from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

})

export const validate = (data) => {
    const schema = joi.object({
        Name:joi.string().required().label("Name"),
        Username:joi.string().required().label("User name"),
        email:joi.string().required().label("email"),
        password:PasswordComplexity().required().label("password")

    });
    return schema.validate(data)
}


export const User = mongoose.model('user',userSchema);