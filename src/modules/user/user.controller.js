import userModel from "../../../DB/model/user.model.js"
import bcrypt from "bcryptjs";

 export const updatePassword=async(req,res,next)=>{
        const {oldPassword,newPassword}=req.body;
        const user=await userModel.findById(req.user._id);
        const match=bcrypt.compareSync(oldPassword,user.password);
        if(!match){
            return next(new Error("invalid old password"));
        }
        const hashPassword=bcrypt.hashSync(newPassword,parseInt(process.env.SALTROUND));
        user.password=hashPassword;
        user.save();
        return res.status(200).json({message:"success"});
    }
 export const shareProfile=async(req,res,next)=>{
        const user=await userModel.findById(req.params.id).select('userName email')
        if(!user){
            return next(new Error('User not found'));
        }
        return res.status(200).json({message:'success',user});
    }
