import { model } from "mongoose";
import { EventSchema } from "./schema/event.schema.ts";
import { participantSchema } from "./schema/participants.schema.ts";
import { eventOrganiserSchema } from "./schema/eventOrganiser.schema.ts";
import { EventInterface, EventOrganiserInterface, ParticipantInterface } from "./types/main.types.ts";

const Event = model<EventInterface>("Event", EventSchema);
const Paticipants = model<ParticipantInterface>("Participant", participantSchema);
const EventOrganiser = model<EventOrganiserInterface>("EventOrganiser", eventOrganiserSchema);

export {
    Event,
    Paticipants,
    EventOrganiser,
}