import { Request, Response } from 'express'
import Utilities from '../utilities/Utilities'
import User from '../models/userSchema'
import ServerResponse from '../utilities/ServerResponse'
import { wd } from '../config/workingDirectory'

class UserController {

    public async register(req: any, res: Response) {
        try{
            let {firstName, lastName, idUser} = req.body

            let parsedFirstName = (firstName as string).toLowerCase()
            parsedFirstName = Utilities.capitalizeFirstLetter(parsedFirstName)


            let parsedLastName = (lastName as string).toLowerCase()
            let parsedLastNameArray = parsedLastName.split(' ')

            for (let i = 0; i < parsedLastNameArray.length; i++) {
                parsedLastNameArray[i] = Utilities.capitalizeFirstLetter(
                    parsedLastNameArray[i]
                )
            }
            parsedLastName = parsedLastNameArray.join(' ')

            //validations
            if(!Utilities.nameValidation(parsedFirstName)) {throw new Error('Invalid first name')}
            req.body.firstName = parsedFirstName

            if(!Utilities.nameValidation(parsedLastName)) {throw new Error('Invalid last name')}
            req.body.lastName = parsedLastName

            if(!Utilities.idValidation(idUser)) {throw new Error('Invalid Id number')}
            req.body.idUser = idUser

            //CREATE Mongoose object
            const user = new User(req.body)
            await user.save()
            console.log('User created successfully')

            const registerPayload = {
                user: user,
            }

            ServerResponse.created(res, 'Te has creado correctamente', registerPayload)
            

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

    public async update(req: any, res: Response) {
        try {
            const body = req.body
            
        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(res, err.message)
        }
    }
}

export default UserController