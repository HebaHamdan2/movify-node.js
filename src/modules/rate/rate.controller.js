import rateModel from "../../../DB/model/rate.model.js";

export const create=async(req,res,next)=>{
    const {showId}=req.params;
    const {rating}=req.body;
    
    const checkRate=await rateModel.findOne({
        createdBy:req.user._id,
        showId:showId
    })
    if(checkRate){
        return next(new Error(`alredy rate`,{cause:404}));
    }
    const rate=await rateModel.create({
        rating,
        createdBy:req.user._id,
        showId
    });
    if(!rate){
        return next(new Error(`error while adding rate`,{cause:400}));
    }
    return res.status(201).json({message:"success",rate});
}