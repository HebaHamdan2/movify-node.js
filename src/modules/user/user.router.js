import {Router} from 'express';
import{auth}from '../../middleware/auth.js';
import * as userController from './user.controller.js';
import { endPoint } from './user.endPoint.js';
import * as valdators from "./user.validation.js"
import { validation } from '../../middleware/validation.js';
import { asyncHandler } from '../services/errorHandling.js';
const router =Router();
router.patch("/updatePassword",auth(endPoint.updatePass),validation(valdators.updatePassword),asyncHandler(userController.updatePassword));//update password
router.get("/:id/profile",asyncHandler(userController.shareProfile));//share profile
export default router;