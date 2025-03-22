import { model } from "mongoose";
import { EventSchema } from "./schema/event.schema";
import { participantSchema } from "./schema/participants.schema";
import { eventOrganiserSchema } from "./schema/eventOrganiser.schema";
import { Event, EventOrganiser, Participant } from "./types/main.types";

const Event = model<Event>("Event", EventSchema);
const Paticipants = model<Participant>("Participant", participantSchema);
const EventOrganiser = model<EventOrganiser>("EventOrganiser", eventOrganiserSchema);

export {
    Event,
    Paticipants,
    EventOrganiser,
}