import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { Blog } from "../entity/Blog"
import { createBlogSchema } from "../utils/validator/BlogValidator"
import cloudinary from "../libs/cloudinary"
import deleteTempFiles from "../utils/uploadfiles/delete-temp-files"
import { setDefaultResultOrder } from "dns"


export default new class BlogServices {
    private readonly BlogRepository: Repository<Blog> = AppDataSource.getRepository(Blog)

   async find(req: Request, res: Response): Promise<Response> {
    try{
        const blogs = await this.BlogRepository.find();
        return res.status(200).json(blogs);
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "something error while finding all todos"})
    }
   }

   async findOne(req: Request, res: Response): Promise<Response> {
    try {
        const id: number  = Number(req.params.id)

        const blog = await this.BlogRepository.findOneBy({
            id: id
        })

        return res.status(200).json(blog);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something error while finding blog"})
    }
   }

   async create(req: Request, res: Response): Promise<Response> {
    try {
        const data = req.body
        data.image = res.locals.filename
        data.userid = res.locals.loginSession.user.id
        data.author = res.locals.loginSession.user.fullname

        const { error, value } = createBlogSchema.validate(data)
        if(error) return res.status(400).json({ message: error.message})

        const urlImage = await cloudinary.destination(data.image)
        deleteTempFiles()

        const obj = this.BlogRepository.create({
            title: value.title,
            description: value.description,
            image: urlImage,
            user: data.userid,
            author: data.author,
            dateCreated: new Date()
        })

        const blog = await this.BlogRepository.save(obj)

        return res.status(200).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something error while adding data"})
    }
}

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const id = Number(req.params.id)
            data.image = res.locals.filename
            data.userid = res.locals.loginSession.user.id
            data.author = res.locals.loginSession.user.fullname

            const oldData = await this.BlogRepository.findOne({where: {id: id}})
            if(oldData === null) return res.status(400).json({message: "id not found"})
            cloudinary.delete(oldData.image)

            const { error, value } = createBlogSchema.validate(data)
            if(error) return res.status(400).json({ message: error.message})

            const urlImage = await cloudinary.destination(data.image)
            deleteTempFiles()

            

            const blog = await this.BlogRepository.createQueryBuilder()
                                .update(Blog)
                                .set({
                                    title: value.title,
                                    description: value.description,
                                    image: urlImage,
                                    user: data.userid,
                                    author: data.author,
                                    dateCreated: new Date()
                                })
                                .where("id = :id", {id: id})
                                .execute()

            if(blog.affected == 1) return res.status(200).json({message: "update sucess"})
            else return res.status(500).json({message: "something wrong while updating blog"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "something wrong while updating blog"})
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)

            const oldData = await this.BlogRepository.findOne({where: {id: id}})
            cloudinary.delete(oldData.image)

            const blog = await this.BlogRepository.createQueryBuilder()
                                        .delete()
                                        .from(Blog)
                                        .where("id = :id", {id: id})
                                        .execute()

            if(blog.affected == 1) return res.status(200).json({message: "successfully deleted blog"})
                else return res.status(500).json({message: "deleting blog failed"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "something error while deleting blog"})
        }
    }
}