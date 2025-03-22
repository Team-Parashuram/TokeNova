import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { Event, EventOrganiser } from "../../model/index.ts";
import { apiResponse } from "../../util/apiResponse.ts";

const RegisterEO = async (req: Request, res: Response) => {
    try{
        const { name, email, phone, password } = req.body;
        if(!name || !email || !password){
            return apiResponse(res, 400, "Email and Password are required");
        }

        if(password.length < 8){
            return apiResponse(res, 400, "Password must be at least 8 characters");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return apiResponse(res, 400, "Invalid email");
        }

        const eventOrganiser = await EventOrganiser.findOne({ email });
        if(eventOrganiser){
            return apiResponse(res, 400, "Event Organiser already exists");
        }

        const newEventOrganiser = new EventOrganiser({
            name,
            email,
            phone,
            password
        });

        await newEventOrganiser.save();
        return apiResponse(res, 201, "Event Organiser created successfully");
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const LoginE = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return apiResponse(res, 400, "Email and Password are required");
        }

        const eventOrganiser = await EventOrganiser.findOne({
            email
        })

        if(!eventOrganiser){
            return apiResponse(res, 404, "Event Organiser not found");
        }

        const isMatch = await compare(password, eventOrganiser.password);
        if(!isMatch){
            return apiResponse(res, 400, "Invalid Credentials");
        }

        const token = jwt.sign(
            {
                id: eventOrganiser._id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "30d"
            }
        )

        return apiResponse(res, 200, "Login successful", eventOrganiser, token);
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const CreateEvent = async (req: Request, res: Response) => {
    try{
        const { date, description, seats, title, price, location, organisationId } = req.body;

        if(!date || !description || !seats || !title || !price || !location || !organisationId){
            return apiResponse(res, 400, "Missing required fields");
        }

        const eventOrganiser = await EventOrganiser.findById(organisationId);
        if(!eventOrganiser){
            return apiResponse(res, 404, "Event Organiser not found");
        }

        const event = new Event(
            {
                date,
                title,
                seats,
                price,
                location,
                description,
                eventOrganiserId: organisationId,
            }
        );
        await event.save();

        return apiResponse(res, 201, "Event created successfully", event);
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const CancelEvent = async (req: Request, res: Response) => {
    try{
        const { eventId } = req.body;

        await Event.findByIdAndDelete(eventId);
        return apiResponse(res, 200, "Event cancelled successfully");
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

const UpdateEvent = async (req: Request, res: Response) => {
    try{
        const { eventId, date, description, seats, title, price, location } = req.body;

        if(!eventId || !date || !description || !seats || !title || !price || !location ){
            return apiResponse(res, 400, "Missing required fields");
        }

        const event = await Event.findById(eventId);
        if(!event){
            return apiResponse(res, 404, "Event not found");
        }

        if(date){
            event.date = date;
        }
        if(description){
            event.description = description;
        }
        if(seats){
            event.seats = seats;
        }
        if(title){
            event.title = title;
        }
        if(price){
            event.price = price;
        }
        if(location){
            event.location = location;
        }

        await event.save();
        return apiResponse(res, 200, "Event updated successfully", event);
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

export {
    LoginE,
    RegisterEO,
    UpdateEvent,
    CreateEvent,
    CancelEvent,
}