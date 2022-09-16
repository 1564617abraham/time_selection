import { Response } from 'express'

class ServerResponse {

    /**
     * Generates response's body
     * @param message {string | null} Message to be sent
     * @param payload any} Payload to be sent
     * @returns 
     */
    public static gen(message: string, payload: any) {
        if (!payload) {
            payload = {}
        }

        return {
            message: message,
            timestamp: Date.now(),
            payload: payload,
        }
    }

    /**
     * Sends a response with status code 200 and a body with the message, payload and timestamp
     * @param res {Response} Response to be sent
     * @param message {string | null} Message to be sent
     * @param payload {any} Payload to be sent
     */
    public static success(res: Response, message: string | null='' , payload: any = {}) {
        res.status(200).send(ServerResponse.gen(message ?? 'Success', payload))
    }

    public static created(res: Response, message: string | null='', payload: any = {}) {
        res.status(201).send(ServerResponse.gen(message ?? 'Created', payload))
    }

    public static badRequest(res: Response, message: string | null='', payload: any = {}) {
        res.status(400).send(ServerResponse.gen(message ?? 'Bad Request', payload))
    }

    public static notFound(res: Response, message: string | null='', payload: any = {}) {
        res.status(404).send(ServerResponse.gen(message ?? 'Not Found', payload))
    }

    public static forbidden(res: Response, message: string | null='', payload: any = {}) {
        res.status(403).send(ServerResponse.gen(message ?? 'Forbidden', payload))
    }

    public static unauthorized(res: Response, message: string | null='', payload: any = {}) {
        res.status(401).send(ServerResponse.gen(message ?? 'Unauthorized', payload))
    }

    public static error(res: Response, message: string | null='', payload: any = {}) {
        res.status(500).send(ServerResponse.gen(message ?? 'Internal Server Error', payload))
    }
}

export default ServerResponse