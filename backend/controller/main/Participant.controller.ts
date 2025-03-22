import ResponseApi from "../../util/apiResponse";
import { Request, Response } from "express";


const Register =  async (req: Request, res: Response) => {
    try{
        const { name, email, phone, password } = req.body;
        
        if(!email || !password){
            ResponseApi(res, 400, 'Email and Password is required', [], '');
        }

        
    }catch(error){
        console.log(error);
        ResponseApi(res, 500, 'Internal Server Error', [], '');
    }
}