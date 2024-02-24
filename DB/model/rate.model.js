import mongoose,{Schema,Types,model} from 'mongoose';
const rateSchema=new Schema({
    rating:{
        type:Number,
       min:1,
       max:5,
       required:true
    },
    createdBy:{type:Types.ObjectId,ref:'User',required:true},
    showId:{
        type:String,required:true
    },
   
},
{
    timestamps:true,
})
const rateModel=mongoose.models.Rate||model("Rate",rateSchema);
export default rateModel;