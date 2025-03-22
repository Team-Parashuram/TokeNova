import { Router } from "express";
import {
    LoginP,
    RegisterP,
    registerForEventP,
    verifyParticipantP,
    unregisterForEventP,
} from "../../controller/index.ts"
import { PatientMiddleware } from "../../middleware/patient.middleware.ts";

const ParticipantRouter = Router();

ParticipantRouter.post('/login', LoginP);
ParticipantRouter.post('/register', RegisterP);
ParticipantRouter.post('/verify', verifyParticipantP);
ParticipantRouter.post('/registerEvent',PatientMiddleware,registerForEventP);
ParticipantRouter.post('/unregisterEvent',PatientMiddleware,unregisterForEventP);

export {
    ParticipantRouter
}