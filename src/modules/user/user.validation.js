import joi from "joi"
import{generalFields} from "../../middleware/validation.js";

export const updatePassword=joi.object({
        oldPassword:generalFields.password,
        newPassword:generalFields.password.invalid(joi.ref('oldPassword')),
        cPassword:joi.valid(joi.ref('newPassword')).required(),
    })

  