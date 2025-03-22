import jwt from 'jsonwebtoken';
import { apiResponse } from "../util/apiResponse";
import { NextFunction, Request, Response } from "express";

const EventOrgMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization')?.split(' ')[1];
        if(!token){
            return apiResponse(res, 401, "Unauthorized");
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
            if(error){
                return apiResponse(res, 401, "Unauthorized");
            }

            if(!decoded){
                return apiResponse(res, 401, "Unauthorized");
            }

            if (typeof decoded !== 'string' && '_id' in decoded) {
                req.body.organisationId = decoded._id as string;
            } else {
                return apiResponse(res, 401, "Unauthorized");
            }
            next();
        })
    }catch(error){
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error");
    }
}

export {
    EventOrgMiddleware
}