import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async () => {
    try {
        const { MONGODB_URI, MONGODB_URI_TEST } = process.env

        if (!MONGODB_URI ) { throw new Error('MONGODB_URI is not defined') }
        if (!MONGODB_URI_TEST ) { throw new Error('MONGODB_URI_TEST is not defined') }

        //comprobamos el tipo de base de datos la de testo o la start
        const mongodb_uri = process.env.NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI

        await mongoose.connect(mongodb_uri)

        console.log(`DB successfully connected to ${mongodb_uri}`)
    } catch (error : any) {
        console.error('Could not connect to DB: ', error.message)
        console.log(
            'Make sure MongoDB is installed and running (https://www.mongodb.com/docs/manual/installation/) and then set the MONGODB_URI in your .env file.'
        )
    }
}

export default connectDB
