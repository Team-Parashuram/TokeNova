import { Document, Schema } from "mongoose";

interface EventInterface extends Document {
    date: Date;
    price: number;
    seats: number;
    title: string;
    location: string;
    description: string;
    participants: Schema.Types.ObjectId[];
    eventOrganiserId: Schema.Types.ObjectId;
}

interface EventOrganiserInterface extends Document {
    name: string;
    email: string;
    phone?: string;
    events: Schema.Types.ObjectId[];
    password: string;
}

interface ParticipantInterface extends Document {
    name?: string;
    email: string;
    phone?: string;
    events: Schema.Types.ObjectId[];
    password: string;
}

export {
    EventInterface,
    ParticipantInterface,
    EventOrganiserInterface,
};
