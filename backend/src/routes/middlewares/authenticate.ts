import { Request, Response, NextFunction } from 'express'
import Jwt from '../../utilities/Jwt'
import ServerResponse from '../../utilities/ServerResponse'

/**
 * Middleware to authenticate a user given a token
 *
 * @param req {any} Request received from the client
 * @param res {Response} Response sent to the client
 * @param next Callback function called when authentication is successful
 */
function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (!authToken) {
        ServerResponse.unauthorized(res, 'No se ha proporcionado ningún token')
        return
    }
    const token = authToken.split(' ')[1]
    let temp = Jwt.verify(token)
    if (!temp) {
        ServerResponse.forbidden(res, 'El token no es válido')
        return
    }

    req.tokenPayload = temp
    next()
}

export default authenticateToken
