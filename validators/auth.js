import Joi from "joi";
import { customEmailValidation, customPasswordValidation } from "../utils/validation.js";


export const LOGIN_SCHEMA = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required()
})

export const SIGNUP_SCHEMA = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().custom(customEmailValidation).required(),
    password: Joi.string().custom(customPasswordValidation).required()
})