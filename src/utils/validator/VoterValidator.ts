import { Paslon } from './../../entity/Paslon';
import * as joi from "joi"

export const createVoterSchema = joi.object({
    name:joi
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

    paslonName: joi
        .string()
        .required(),

    paslonId: joi
        .number()
        .required()
})
