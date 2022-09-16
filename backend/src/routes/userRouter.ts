import express from "express" //ESModules
import UserController from "../services/userController"


const router = express.Router()

const userController = new UserController()

router.post('/register', userController.register)

export default router