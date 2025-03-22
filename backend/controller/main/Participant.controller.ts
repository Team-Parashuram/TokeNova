import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { Event, Paticipants } from "../../model/index.ts";
import { apiResponse } from "../../util/apiResponse.ts";

const RegisterP = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!email || !password) {
            return apiResponse(res, 400, "Email and Password are required");
        }

        if (password.length < 8) {
            return apiResponse(res, 400, "Password must be at least 8 characters");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return apiResponse(res, 400, "Invalid email");
        }

        const participant = await Paticipants.findOne({ email });

        if (participant) {
            return apiResponse(res, 400, "Participant already exists");
        }

        const newParticipant = new Paticipants({
            name,
            email,
            phone,
            password
        });

        await newParticipant.save();
        return apiResponse(res, 201, "Participant created successfully");
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
};

const LoginP = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return apiResponse(res, 400, "Email and Password are required");
        }

        const participant = await Paticipants.findOne({ email });

        if (!participant) {
            return apiResponse(res, 404, "Participant not found");
        }

        const isMatch = await compare(password, participant.password);
        if (!isMatch) {
            return apiResponse(res, 400, "Invalid Credentials");
        }

        const token = jwt.sign(
            {
                _id: participant._id,
            },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '30d' }
        );

        return apiResponse(res, 200, "Login Successful", participant, token);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
};

const verifyParticipantP = async (req: Request, res: Response) => {
    try{
        const { participantId } = req.body;

        const participant = await Paticipants.findById(participantId).select("-password");
        if(!participant){
            return apiResponse(res, 404, "Participant not found");
        }

        return apiResponse(res, 200, "Participant found", participant);
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const registerForEventP = async (req: Request, res: Response) => {
    try{
        const { participantId, eventId } = req.body;

        const participant = await Paticipants.findById(participantId);
        if(!participant){
            return apiResponse(res, 404, "Participant not found");
        }

        const event = await Event.findById(eventId);
        if(!event){
            return apiResponse(res, 404, "Event not found");
        }

        if(participant.events.includes(eventId)){
            return apiResponse(res, 400, "Participant already registered for this event");
        }

        participant.events.push(eventId);
        event.participants.push(participantId);

        if(event.seats < 0){
            return apiResponse(res, 400, "Event is full");
        }
        
        event.seats -= 1;

        await participant.save();
        await event.save();

        return apiResponse(res, 200, "Participant registered for event successfully");
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const unregisterForEventP = async (req: Request, res: Response) => {
    try{
        const { participantId, eventId } = req.body;

        const participant = await Paticipants.findById(participantId);
        if(!participant){
            return apiResponse(res, 404, "Participant not found");
        }

        const event = await Event.findById(eventId);
        if(!event){
            return apiResponse(res, 404, "Event not found");
        }

        if(!participant.events.includes(eventId)){
            return apiResponse(res, 400, "Participant not registered for this event");
        }

        participant.events = participant.events.filter(event => event.toString() !== eventId);
        event.participants = event.participants.filter(participant => participant.toString() !== participantId);

        await participant.save();
        await event.save();

        return apiResponse(res, 200, "Participant unregistered for event successfully");
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

export {
    LoginP,
    RegisterP,
    registerForEventP,
    verifyParticipantP,
    unregisterForEventP,
};