import { Request, Response } from 'express'
import Utilities from '../utilities/Utilities'
import User from '../models/userSchema'
import ServerResponse from '../utilities/ServerResponse'
import Jwt from '../utilities/Jwt'
import { wd } from '../config/workingDirectory'
import userSchema from '../models/userSchema'

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

            let aux = JSON.parse(JSON.stringify(user))
            delete aux.__v
            delete aux.password
            const accessToken = Jwt.sign(aux)
            delete aux._id

            const registerPayload = {
                user: user,
                accessToken: accessToken,
            }
            console.log()
            console.log(user)
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
            let {firstName, lastName, idUser} = body
            const { tokenPayload } = req

            if (!tokenPayload || !tokenPayload._id) {
                ServerResponse.error(res, 'Invalid token payload')
                return
            }

            const user = await User.findOne({ _id: tokenPayload._id })

            if ( firstName ) {
                let parsedFirstName = (firstName as string).toLowerCase()
                parsedFirstName = 
                    Utilities.capitalizeFirstLetter(parsedFirstName)

                if(!Utilities.nameValidation(parsedFirstName)) {
                    throw new Error('Invalid first name')
                }
                if(user == null) {throw new Error('Invalid first name')}
                user.firstName = parsedFirstName 
            }

            if ( lastName) {
                let parsedLastName = (lastName as string).toLowerCase()
                let parsedLastNameArray = parsedLastName.split(' ')

                for (let i = 0; i < parsedLastNameArray.length; i++) {
                    parsedLastNameArray[i] = Utilities.capitalizeFirstLetter(
                        parsedLastNameArray[i]
                    )
                }   
                parsedLastName = parsedLastNameArray.join(' ')

                if (!Utilities.nameValidation(parsedLastName)) {
                    throw new Error('El apellido no es válido.')
                }
                if(user == null) {throw new Error('Invalid last name')}
                user.lastName = parsedLastName


            }

            if ( idUser ) {
                
                if (!Utilities.idValidation(idUser)) {
                    throw new Error('Id Incorrecto.')
                }
                if(user == null) {throw new Error('Invalid idUser')}
                user.idUser = idUser
            }
            if(user == null) {throw new Error('Invalid idUser')}
            await user.save()
            
            console.log(`User has been modified`, user)
            console.log(user)
            ServerResponse.success(
                res,
                'Tu cuenta ha sido actualizada correctamente',
                user
            )
        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(res, err.message)
        }
    }

    public async gets(req: any, res: Response) {
        try {
            const users = await User.find()
            res.json(users)

        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(res, err.message)
        }
    }

    public async get(req: any, res: Response) {
        try {
            const { tokenPayload } = req

            if (!tokenPayload || !tokenPayload._id) {
                ServerResponse.error(
                    res,
                    'No tienes permisos para realizar esta acción'
                )
                return
            }

            const user = await User.findOne({_id: tokenPayload._id}).select(
                '-__v'
            )
    
            console.log('User get')
            console.log(user)
            ServerResponse.success(
                res,
                'Tu información se ha recuperado correctamente',
                user
            )
        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(res, err.message)
        }
    }

    public async delete( req: any, res: Response) {
        try {
            const {tokenPayload} = req

            if (!tokenPayload || !tokenPayload._id) {
                ServerResponse.error(
                    res,
                    'No tienes permisos para realizar esta acción'
                )
                return
            }

            const user = await User.findOne({_id : tokenPayload._id})

            if (!user) {
                throw new Error('No se puede encontró el usuario')
            }

            await user.remove()

            console.log('User remove')
            console.log(user)
            ServerResponse.success(
                res,
                'Usuario eliminado'
            )

        } catch (err: any) {
            console.error(err)
            ServerResponse.badRequest(res, err.message)
        }
        

    }

}

export default UserController