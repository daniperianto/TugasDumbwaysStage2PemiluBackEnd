import { Paslon } from './../entity/Paslon';
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createPaslonSchema } from "../utils/validator/PaslonValidator"
import deleteTempFiles from '../utils/uploadfiles/delete-temp-files';
import cloudinary from '../libs/cloudinary';
import Partai from '../entity/Partai';


export default new class BlogServices {
    private readonly PaslonRepository: Repository<Paslon> = AppDataSource.getRepository(Paslon)

    private async getCount(): Promise<number> {
        try {

            const data = await this.PaslonRepository.find()
            
            return data.length
        } catch (error) {
            console.log(error)
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const paslons = await this.PaslonRepository.find({
                relations: ["partai"]
            })

            return res.status(200).json(paslons)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Something error while getting data"})
        }

    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const paslon = await this.PaslonRepository.findOne({
                where: {id: id},
                relations: ["partai"]})

            return res.status(200).json(paslon)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "something error while getting paslon"})
        }
    }


    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            data.image = res.locals.filename
            let paslonNumber = await this.getCount() + 1

            const { error } = createPaslonSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})

            const urlImage = await cloudinary.destination(data.image)
            deleteTempFiles();
            

            const obj = this.PaslonRepository.create({
                name: data.name,
                paslonNumber: paslonNumber,
                visionMission: data.visionMission,
                image: urlImage
            })

            const paslon = await this.PaslonRepository.save(obj)

            return res.status(200).json(paslon)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Something error while adding data"})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = req.body
            data.image = res.locals.filename
            const id = Number(req.params.id)

            const { error } = createPaslonSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})

            const urlImage = await cloudinary.destination(data.image)
            deleteTempFiles();

            const oldData = await this.PaslonRepository.findOne({where: { id: id}})
            cloudinary.delete(oldData.image)

            const paslon = await this.PaslonRepository.createQueryBuilder()
                                    .update(Paslon)
                                    .set({
                                        name: data.name,
                                        visionMission: data.visionMission,
                                        image: urlImage
                                    })
                                    .where("id = :id", { id: id})
                                    .execute()
            

            if(paslon.affected == 1) return res.status(200).json({message: "update success"})
            else return res.status(500).json({message: "Something wrong while updating paslon"})
        } catch(error) {
            console.log("error updated paslon: " + error)
            return res.status(500).json({message: "Something wrong while updating paslon"})
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            
            const oldData = await this.PaslonRepository.findOne({where: {id: id}})
            cloudinary.delete(oldData.image)

            const paslon = await this.PaslonRepository.createQueryBuilder()
                                    .delete()
                                    .from(Paslon)
                                    .where("id = :id", {id: id})
                                    .execute()

            if(paslon.affected == 1) return res.status(200).json({message: "successfully deleted paslon"})
            else return res.status(500).json({message: "deleting paslon failed"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "something error while deleting paslon"})
        }
    }


}