import * as joi from "joi"

export const createUserSchema = joi.object({
    fullname:joi
        .string()
        .min(2)
        .max(30)
        .required(),

    
    address: joi
        .string()
        .min(10)
        .required(),
    
    sex: joi
        .string()
        .required(),

    username: joi
        .string()
        .required(),

    password: joi
        .string()
        .min(8)
        .required(),
})

export const createLoginSchema = joi.object({
    username: joi
        .string()
        .required(),

    password: joi
        .string()
        .min(8)
        .required(),
})
