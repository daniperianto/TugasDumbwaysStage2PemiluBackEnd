import * as joi from "joi"

export const createPartaiSchema = joi.object({
    name:joi
        .string()
        .min(2)
        .max(30)
        .required(),

    leader:joi
        .string()
        .min(2)
        .max(30)
        .required(),
    
    visionMission: joi
        .string()
        .min(10)
        .required(),

    address: joi
        .string()
        .min(10)
        .required(),
    
    image: joi
        .required(),

    paslonId: joi
        .required()
})
