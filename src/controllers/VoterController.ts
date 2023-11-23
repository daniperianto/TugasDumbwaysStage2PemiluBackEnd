import { Request, Response } from "express";
import VoterServices from "../services/VoterServices";

export default new class VoterControllers {
    find(req: Request, res: Response) {
        VoterServices.find(req, res)
    }

    vote(req: Request, res: Response) {
        VoterServices.vote(req, res)
    }
}