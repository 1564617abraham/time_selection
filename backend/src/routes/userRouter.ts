import express from "express" //ESModules
import UserController from "../services/userController"
import idUser from '../models/userSchema'
import authenticateToken from "./middlewares/authenticate"



const router = express.Router()

const userController = new UserController()

router.post('/register', userController.register)
router.put('/', authenticateToken, userController.update)
router.get('/gets', userController.gets)
router.get('/', authenticateToken, userController.get)
router.delete('/', authenticateToken, userController.delete)

export default router