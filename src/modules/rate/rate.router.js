import {Router} from "express"
import * as rateController from "./rate.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./rate.endPoint.js";
import { asyncHandler } from "../services/errorHandling.js";
const router=Router();
router.post("/:showId",auth(endPoint.create),asyncHandler(rateController.create));
export default router;