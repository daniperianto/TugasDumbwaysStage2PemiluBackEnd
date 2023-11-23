import * as joi from "joi"

export const createPaslonSchema = joi.object({
    name:joi
        .string()
        .min(2)
        .max(30)
        .required(),
    
    visionMission: joi
        .string()
        .min(10)
        .required(),
    
    image: joi
        .required()
})
