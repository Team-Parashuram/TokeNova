import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import { EventOrganiser } from "../types/main.types.ts";

const eventOrganiserSchema = new Schema<EventOrganiser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        phone: {
            type: String,
            required: [true, "Phone is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    },
    {
        timestamps: true
    }
);

eventOrganiserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch(error){
        return next(error as Error);
    }
})

export { eventOrganiserSchema };
