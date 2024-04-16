import Router from "express"
import { User,validate } from "../schema/user.js"
import bcrypt from "bcrypt";
const router = Router()

router.post('/',async(req,res) => {
    try {
        const {error} = validate(req.body)
        if(error)
            return res.status(400).json({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"User with this email already exists"})
        const sugar = await bcrypt.genSalt(Number(process.env.SUGAR))
        const hashPassword = await bcrypt.hash(req.body.password,sugar)

        const result = await new User({...req.body,password:hashPassword}).save()
        console.log("This is the log message",result)
        res.status(201).send({message:"User created Successfully!",id:result._id,fn:result.Name,email:result.email})
    } catch (error) {
        res.status(500).json({message:"internal server Error"});
        console.log(error)
    }
})
export default router
