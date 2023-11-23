import { Request, Response } from "express";
import PartaiServices from "../services/PartaiServices";

export default new class PartaiControllers {
    add(req: Request, res: Response) {
        PartaiServices.create(req, res)
    }

    findOne(req: Request, res: Response) {
        PartaiServices.findOne(req, res)
    }

    find(req: Request, res: Response) {
        PartaiServices.find(req, res)
    }

    update(req: Request, res: Response) {
        PartaiServices.update(req, res)
    }

    delete(req: Request, res: Response) {
        PartaiServices.deleteById(req, res)
    }
}