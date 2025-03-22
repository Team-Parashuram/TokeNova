import { Schema } from "mongoose";
import { Event } from "../types/main.types";

const EventSchema = new Schema<Event>(
    {
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
            required: [true,"Title is required"]
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
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
)

export {
    EventSchema
}

// date : Date;
// price : number;
// title : string;
// location : string;
// description : string;
// eventOrganiserId : string;