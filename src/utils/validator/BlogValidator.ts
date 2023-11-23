import * as joi from "joi"

export const createBlogSchema = joi.object({
    title:joi
        .string()
        .min(4)
        .max(50)
        .required(),
    
    description: joi
        .string()
        .min(10)
        .required(),

    image: joi
        .string()
        .required(),

    userid: joi
        .number()
        .required(),

    author: joi
        .string()
        .required()
})