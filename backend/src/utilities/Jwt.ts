import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Contains all the methods related to processing the client's token
 *
 * @class Jwt
 */
class Jwt {
    public static secret = process.env.JWT_SECRET

    /**
     * Check if JWT_SECRET is defined in file .env
     *
     */
    public static assertSecret(): void {
        if (!Jwt.secret) {
            throw new Error('Make sure u have defined JWT_SECRET in your .env')
        }
    }

    /**
     * Generates a token containing the user's id
     *
     * @param payload Payload to be stored in the token
     * @returns Signed token
     */
    public static sign(payload: any) {
        try {
            Jwt.assertSecret()

            return jwt.sign(payload, Jwt.secret!, {
                expiresIn: '30d',
            })
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Checks if the token is provided by the client and if it is valid
     *
     * @param token {string} User's token
     *
     */
    public static verify(token: string) {
        try {
            Jwt.assertSecret()

            return jwt.verify(token, Jwt.secret!)
        } catch (err) {
            console.error(err)
        }
    }
}
export default Jwt
