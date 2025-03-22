import { Router } from "express";
import {
    LoginE,
    RegisterEO,
    UpdateEvent,
    CreateEvent,
    CancelEvent,
} from "../../controller/index.ts"

const EventOrganiserRouter = Router();

EventOrganiserRouter.post('/login', LoginE);
EventOrganiserRouter.post('/register', RegisterEO);
EventOrganiserRouter.post('/createEvent',EventOrganiserRouter ,CreateEvent);
EventOrganiserRouter.post('/updateEvent',EventOrganiserRouter,UpdateEvent);
EventOrganiserRouter.post('/cancelEvent',EventOrganiserRouter,CancelEvent);

export {
    EventOrganiserRouter
}