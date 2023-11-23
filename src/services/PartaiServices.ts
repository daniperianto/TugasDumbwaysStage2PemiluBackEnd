import { Repository } from "typeorm"
import Partai from "../entity/Partai"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createPartaiSchema } from "../utils/validator/PartaiValidator"
import deleteTempFiles from "../utils/uploadfiles/delete-temp-files"
import cloudinary from "../libs/cloudinary"

export default new class PartaiServices {
    private readonly PartaiRepository: Repository<Partai> = AppDataSource.getRepository(Partai)

    private async getCount(): Promise<number> {
        try {

            const data = await this.PartaiRepository.find()
            
            return data.length
        } catch (error) {
            console.log(error)
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const partais = await this.PartaiRepository.find()

            return res.status(200).json(partais)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Something error while getting data"})
        }

    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const partai = await this.PartaiRepository.findOne({where: {id: id}})

            return res.status(200).json(partai)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Something error while getting data"})
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            data.image = res.locals.filename
            let partaiNumber = await this.getCount() + 1
    
            const { error } = createPartaiSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})
    
            const urlImage = await cloudinary.destination(data.image);
            deleteTempFiles();
            
    
            const obj = this.PartaiRepository.create({
                name: data.name,
                leader: data.leader,
                partaiNumber: partaiNumber,
                visionMission: data.visionMission,
                image: urlImage,
                address: data.address,
                paslon: data.paslonId
            })
    
            const paslon = await this.PartaiRepository.save(obj)
    
            return res.status(200).json(paslon)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Something error while adding data"})
        }
    }

    async update(req: Request, res: Response) :Promise<Response> {
        try {
            const data = req.body
            data.image = res.locals.filename
            const id = Number(req.params.id)

            const { error } = createPartaiSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})

            const urlImage = await cloudinary.destination(data.image);
            deleteTempFiles();

            const olData = await this.PartaiRepository.findOne({where: {id: id}})
            cloudinary.delete(olData.image)

            const partai = await this.PartaiRepository.createQueryBuilder()
                                    .update(Partai)
                                    .set({
                                        name: data.name,
                                        leader: data.leader,
                                        visionMission: data.visionMission,
                                        image: urlImage,
                                        address: data.address,
                                        paslon: data.paslonId
                                    })
                                    .where("id = :id", {id: id})
                                    .execute()
            
            if(partai.affected == 1) return res.status(200).json({message: "update success"})
            else return res.status(500).json({message: "something wrong while updating partai"})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something wrong while updating partai"})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try{
            const id = Number(req.params.id)
            
            const oldData = await this.PartaiRepository.findOne({where: {id: id}})
            cloudinary.delete(oldData.image)
            
            const partai = await this.PartaiRepository.createQueryBuilder()
                                    .delete()
                                    .from(Partai)
                                    .where("id = :id", {id: id})
                                    .execute()

            if(partai.affected == 1) return res.status(200).json({message: "successfully deleted partai"})
            else return res.status(500).json({message: "deleting partai failed"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "something error while deleting partai"})
        }
    }
   

}