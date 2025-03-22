import bcrypt from 'bcryptjs';
import { Schema } from "mongoose";
import { Participant } from "../types/main.types.ts";

const participantSchema = new Schema<Participant>(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: {
            type: Number,
            required: [true, 'Phone is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    },
    {
        timestamps: true
    }
)

participantSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch(error){
        return next(error as Error);
    }
})

export {
    participantSchema
}