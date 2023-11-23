import { Request, Response } from "express";
import PaslonServices from "../services/PaslonServices";

export default new class PaslonControllers {
    find(req: Request, res: Response) {
        PaslonServices.find(req, res)
    }

    findById(req: Request, res: Response) {
        PaslonServices.findById(req, res)
    }

    create(req: Request, res: Response) {
        PaslonServices.create(req, res)
    }

    update(req: Request, res: Response) {
        PaslonServices.update(req, res)
    }

    deleteById(req: Request, res: Response) {
        PaslonServices.deleteById(req, res)
    }
}