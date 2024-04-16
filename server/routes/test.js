import Router from "express"
import { Resend } from 'resend';
import { User,validate } from "../schema/user.js"
import bcrypt from "bcrypt";
const router = Router()

router.post('/:email',async(req,res) => {
  const toEmail = req.params.email  
  try {
      const resend_key  = process.env.RESEND_KEY
      const resend = new Resend(resend_key);
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [toEmail],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
      });
      if (error) {
        res.status(400).json({message:'Error while sending email'});
        console.error({ error });
        return { error };
      }
      res.status(200).json({message:'email sent!'});
      console.log({ data });
      return { data };
    } catch (error) {
        res.status(500).json({message:"internal server Error"});
        console.log(error)
    }
})
export default router


