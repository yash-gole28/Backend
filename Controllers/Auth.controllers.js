import mongoose from "mongoose";
import UserModal from "../Modals/User.modal.js";
import bcrypt from 'bcrypt'


export const Login = async (req, res) => {
    const {email , password} =req.body
    if(!email || !password)return res.status(404).json({success:false , message:"incomplete fields"})
    const user =await UserModal.findOne({email:email})

    if(!user)return res.status(401).json({success:false , message:'invalid email'})
    
    const isPasswordCorrect =await bcrypt.compare(password , user.password)
    if(!isPasswordCorrect)return res.status(401).json({success:false , message:'wrong password'})
    return res.status(200).json({success:true , message:'login successful',user :user.name,id : user._id })
}
export const Register = async (req, res) => {
    try {
        
        const { name, email, password, number } = req.body;
  
        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "All fields are mandtory." })

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = new UserModal({
            name: name,
            email: email,
            password: hashedPassword,
            number:number,
        })
        // console.log(user)
        await user.save();
        // res.send("hello there")
        return res.status(200).json({ success: true, message: "Registeration Successfull.",user })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const getCurrentUser = (req, res) => {
    
}