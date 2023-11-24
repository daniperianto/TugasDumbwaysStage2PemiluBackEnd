import * as express from "express"
import BlogControllers from "../controllers/BlogControllers";
import PaslonControllers from "../controllers/PaslonControllers";
import PartaiControllers from "../controllers/PartaiControllers";
import UserControllers from "../controllers/UserControllers";
import AuthenticationMiddlewares from "../middlewares/Auth"
import FileUpload from "../middlewares/UploadFile";
import VoterController from "../controllers/VoterController";

const router = express.Router()
const uploadMiddleware = new FileUpload("image")

router.get("/blogs", BlogControllers.find)
router.get("/blogs/:id", BlogControllers.findOne)
router.post("/blogs/add", AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), BlogControllers.create)
router.patch("/blogs/:id", AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), BlogControllers.update)
router.delete("/blogs/:id", AuthenticationMiddlewares.Authentication, BlogControllers.delete)

router.get("/paslons", PaslonControllers.find)
router.get("/paslons/:id", PaslonControllers.findById)
router.post("/paslons/add", AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware) , PaslonControllers.create)
router.patch("/paslons/:id", AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware) , PaslonControllers.update)
router.delete("/paslons/:id", AuthenticationMiddlewares.Authentication, PaslonControllers.deleteById)

router.get("/partais", PartaiControllers.find)
router.get("/partais/:id", PartaiControllers.findOne)
router.post("/partais/add",AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), PartaiControllers.add)
router.patch("/partais/:id",AuthenticationMiddlewares.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), PartaiControllers.update)
router.delete("/partais/:id", AuthenticationMiddlewares.Authentication, PartaiControllers.delete)

router.post("/user/register", UserControllers.register)
router.post("/user/login", UserControllers.login)
router.get("/user/check", AuthenticationMiddlewares.Authentication, UserControllers.check)

router.get("/voters/findall", AuthenticationMiddlewares.Authentication, VoterController.find)
router.post("/voters/vote", AuthenticationMiddlewares.Authentication, VoterController.vote)

export default router;