import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model";

export const validateJwt = async (req: Request, res: Response, next: NextFunction) =>{
    const token =  req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try{
        const decode: any = jwt.verify(token, process.env.SECRET_PRIVATE_KEY!);

        const user =  await User.findById(decode.uid);
        if(!user){
            return res.status(401).json({
               msg: "Error token no valido"
            });
        }

        if(!user.state){
            return res.status(401).json({
               msg: "Error el usuario se encuentra cancelado"
            });
        }

        req.user = user;
        next();


    }catch (e){
        res.status(401).json({
            msg: "Token no es valido"
        });
    }
};