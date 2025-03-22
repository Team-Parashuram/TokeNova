import mongoose, { Document } from "mongoose";

interface Event extends Document {
    date : Date;
    price : number;
    title : string;
    location : string;
    description : string;
    eventOrganiserId : mongoose.ObjectId;
}

interface EventOrganiser extends Document {
    name : string;
    email : string;
    phone : string;
    events: Event[];
    password : string;
}

interface Participant extends Document {
    name : string | "";
    email : string;
    phone : Number | "";
    events : Event[];
    password : string;
}

export {
    Event,
    Participant,
    EventOrganiser,
}