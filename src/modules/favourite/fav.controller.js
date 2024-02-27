import favModel from "../../../DB/model/favourite.model.js";

export const createFav = async (req, res,next) => {
  const { showId } = req.body;
  const fav = await favModel.findOne({ userId: req.user._id })
  if (!fav) {
    const newFav = await favModel.create({
      userId: req.user._id,
      shows: { showId },
      count:1
    });

    return res.status(201).json({ message: "success", newFav });
  }

    let matched= false;
    for (let i = 0; i < fav.shows.length; i++) {
      if (fav.shows[i].showId === showId) {
        matched = true;
        break;
      }
    }
    if(matched){
      let count=fav.count-1;
  await favModel.updateOne(
    { userId: req.user._id },
    {
      $pull: {
        shows: {
          showId,
        },

      },
      count
    }
  );
  }
  if(!matched){
  let count=fav.shows.length+1;
    await fav.shows.push({ showId });
    fav.count=count;
    fav.save();}
    return res.status(201).json({ message: "success", fav });
  
};

export const removeItem = async (req, res) => {
  const { showId } = req.body;
  const fav = await favModel.findOne({ userId: req.user._id })
  let count=fav.count-1;
  await favModel.updateOne(
    { userId: req.user._id },
    {
      $pull: {
        shows: {
          showId,
        },

      },
      count
    }
  );
  return res.status(200).json({ message: "success" });
};
export const clearFav= async (req, res) => {
  const Fav = await favModel.updateOne(
    { userId: req.user._id },
    { shows: [] , count:0}
  );

  return res.status(200).json({ message: "success",Fav});
};
export const getFav = async (req, res) => {
  const fav = await favModel.findOne({ userId: req.user._id });
  return res.status(200).json({ message: "success", fav: fav });
};
export const checkIsinFav=async (req,res,next)=>{
  const{showId}=req.body;
  const fav=await favModel.findOne({userId:req.user._id});
  if(!fav){  return res.status(200).json({message:'favourite list is empty'})}
  for(let i=0;i<fav.shows.length;i++){
    if(fav.shows[i].showId===showId){
      return  res.status(200).json({ message: "show is saved"});
    }
  }
  return res.status(200).json({message:"not saved"});
}