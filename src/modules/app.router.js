import connectDB from "../../DB/connection.js";
 import authRouter from "./auth/auth.router.js";
 import favRouter from "./favourite/fav.router.js";
import userRouter from "./user/user.router.js";
import watchRouter from "./watchlist/watchlist.router.js";
 import rateRouter from "./rate/rate.router.js"
import cors from "cors"
import { globalErrorHandler } from "./services/errorHandling.js";
const initApp = async (app, express) => {
// Enable cors at the server side. 
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:4000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
}
app.use(cors(corsOption));
  connectDB();
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "welcome" });
  });
app.use("/auth", authRouter);
app.use("/fav", favRouter);
app.use("/whatchlist", watchRouter);
 app.use("/user", userRouter);
  app.use("/rate",rateRouter);
  app.get("*", (req, res) => {
    return res.status(500).json({ messsage: "page not found" });
  });
   app.use(globalErrorHandler);
};
export default initApp;
