import { Schema } from "mongoose";
import { Event } from "../types/main.types.ts";

const EventSchema = new Schema<Event>(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Participant'
            }
        ],
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        seats: {
            type: Number,
            required: [true, "Seats is required"]
        },
        location: {
            type: String,
            required: [true, "Location is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        eventOrganiserId: {
            type: Schema.Types.ObjectId,
            ref: 'EventOrganiser',
            required: [true, 'Event Organiser ID is required']
        }
    },
    {
        timestamps: true
    }
);

export { 
    EventSchema
};