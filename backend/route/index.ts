import { Router } from "express";
import { ParticipantRouter } from "./main/Participant.route.ts";
import { EventOrganiserRouter } from "./main/EventOrganiser.route.ts";

const MainRouter = Router();

MainRouter.use('/participant', ParticipantRouter);
MainRouter.use('/eventOrganiser', EventOrganiserRouter);

export {
    MainRouter
}