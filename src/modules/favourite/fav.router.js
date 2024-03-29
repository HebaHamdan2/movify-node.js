import { Router } from "express";
import * as favController from "./fav.controller.js";
import { endPoint } from "./fav.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../services/errorHandling.js";
const router = Router();
router.post("/", auth(endPoint.create), asyncHandler(favController.createFav));
router.patch("/removeItem", auth(endPoint.delete),asyncHandler(favController.removeItem));
router.patch("/clear", auth(endPoint.clear),asyncHandler(favController.clearFav));
router.get("/get", auth(endPoint.get),asyncHandler(favController.getFav));
router.patch("/check", auth(endPoint.get),asyncHandler(favController.checkIsinFav));
export default router;
