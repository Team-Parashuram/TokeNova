import { Schema } from "mongoose";
import { Participant } from "../types/main.types";

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

export {
    participantSchema
}