import watchlistModel from "../../../DB/model/watchlist.model.js";

export const createWatchlist = async (req, res,next) => {
  const { showId,type} = req.body;
  const watchlist = await watchlistModel.findOne({ userId: req.user._id })
  if (!watchlist) {
    const newWatchlist = await watchlistModel.create({
      userId: req.user._id,
      shows: { showId ,type},
      count:1
    });

    return res.status(201).json({ message: "success", newWatchlist });
  }
  let matched= false;
  for (let i = 0; i < watchlist.shows.length; i++) {
    if (watchlist.shows[i].showId === showId) {
      matched = true;
      break;
    }
  }
  if(matched){
    let count=watchlist.count-1;
await watchlistModel.updateOne(
  { userId: req.user._id },
  {
    $pull: {
      shows: {
        showId,
        type
      },

    },
    count
  }
);
}
    if(!matched){
      let count=watchlist.shows.length+1;
      watchlist.count=count;
       await watchlist.shows.push({ showId,type });
       watchlist.save();
    }
   
    return res.status(201).json({ message: "success", watchlist });
  
  
};

export const removeItem = async (req, res) => {
  const {showId} = req.body;
  const watchlist = await watchlistModel.findOne({ userId: req.user._id })
  let count=watchlist.count-1;
  
    await watchlistModel.updateOne(
    { userId: req.user._id },
    {
      $pull: {
        shows: {
          showId
        },

      },
      count
    }
  );
  return res.status(200).json({ message: "success" });
};
export const clearWatchlist= async (req, res) => {
  const watchlist = await watchlistModel.updateOne(
    { userId: req.user._id },
    { shows: [] , count:0}
  );

  return res.status(200).json({ message: "success",watchlist});
};
export const getWatchlist = async (req, res) => {
  const watchlist = await watchlistModel.findOne({ userId: req.user._id });
  return res.status(200).json({ message: "success", watchlist: watchlist });
};
export const checkIsinwatchlist=async (req,res,next)=>{
  const{showId,type}=req.body;
  const watchlist=await watchlistModel.findOne({userId:req.user._id});
  if(!watchlist){  return res.status(200).json({message:'watchlist is empty'})}
  
  for(let i=0;i<watchlist.shows.length;i++){
    if(watchlist.shows[i].showId===showId &&watchlist.shows[i].type===type ){
      return  res.status(200).json({ message: "show is saved"});
    }
  }
  return res.status(200).json({message:"not saved"});
}