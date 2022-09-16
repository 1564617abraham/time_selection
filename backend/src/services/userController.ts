import { Request, Response } from 'express'
import User from '../models/userSchema'
import ServerResponse from '../utilities/ServerResponse'
import { wd } from '../config/workingDirectory'

class UserController {

    public async register(req: any, res: Response) {
        try{
            let {firstName, lastName, idUser} = req.body
        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(
                res,
                err.code === 11000
                    ? 'Invalid number of id'
                    : err.message
            )
        }
    }
}