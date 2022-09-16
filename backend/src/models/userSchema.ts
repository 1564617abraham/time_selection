import mongoose from 'mongoose'
const { Schema } = mongoose
import { Position } from './position'


const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idUser: { type: String, required: true, unique: true },
    // position: [{ type: String, enum: Position }], 
})

export default mongoose.model('User', UserSchema) 