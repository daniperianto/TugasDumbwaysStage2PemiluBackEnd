import { Paslon } from './../entity/Paslon';
import { User } from './../entity/User';
import { Repository } from "typeorm"
import { Voter } from "../entity/Voter"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createVoterSchema } from "../utils/validator/VoterValidator"

export default new class VoterServices {
    private readonly VoterRepository: Repository<Voter> = AppDataSource.getRepository(Voter)
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
    private readonly PaslonRepository: Repository<Paslon> = AppDataSource.getRepository(Paslon)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const voters = await this.VoterRepository.find()

            return res.status(200).json(voters)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Something error while getting data"})
        }

    }

    async vote(req: Request, res: Response): Promise<Response> {
        try {
            const { paslonNumber } = req.body
            const paslon = await this.PaslonRepository.findOne({where: { paslonNumber: paslonNumber }})

            const userId = res.locals.loginSession.user.id
            const user = await this.UserRepository.findOne({where: { id: userId}})

            const data = {
                name: user.fullname,
                address: user.address,
                sex: user.sex,
                paslonName: paslon.name,
                paslonId: paslon.id
            }
    
            const { error } = createVoterSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})
       
    
            const obj = this.VoterRepository.create({
                name: data.name,
                address: data.address,
                sex: data.sex,
                paslonName: data.paslonName,
                user: userId,
                paslon: paslon
            })
    
            const vote = await this.VoterRepository.save(obj)
    
            return res.status(200).json(vote)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Something error while adding data"})
        }
       }
}