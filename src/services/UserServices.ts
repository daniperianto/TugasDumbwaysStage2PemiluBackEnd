import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createLoginSchema, createUserSchema } from "../utils/validator/UserValidator"
import * as bcrypt  from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class UserServices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = createUserSchema.validate(data)
            if(error) return res.status(400).json(error.message)

            const encryptPassword = await bcrypt.hash(data.password, 10)

            const obj = this.UserRepository.create({
                fullname: data.fullname,
                address: data.address,
                username: data.username,
                password: encryptPassword,
                sex: data.sex,
                role: "user"
            })

            const user = await this.UserRepository.save(obj)

            return res.status(200).json(user)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "Something wrong while register"})
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error} = createLoginSchema.validate(data);
            if(error) return res.status(400).json(error) 

            const isRegistered = await this.UserRepository.findOne({ 
                where: {
                    username: data.username
                }})
            if(!isRegistered) return res.status(409).json({ message: "Email"})

            const isMatchPassword = await bcrypt.compare(data.password, isRegistered.password)
            if(!isMatchPassword) return res.status(409).json({ message: "Incorrect password!"})

            const user = this.UserRepository.create({
                id: isRegistered.id,
                fullname: isRegistered.fullname
            })

            const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: 3600})

            return res.status(200).json({user, token})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "Error while loggedIn!"});
        }
    }

    async check(req: Request, res: Response) : Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;
            const user = await this.UserRepository.findOne({
                where: {
                    id: loginSession.user.id
                }
            })
            
            return res.status(200).json({
                message: "Token is valid!",
                user: user,
            })
        } catch (error) {
            throw new Error("Something went wrong on the server!")
        }
    }  
}