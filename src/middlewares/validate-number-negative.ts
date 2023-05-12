import {NextFunction, Request, Response} from "express";

export const validateNumberNegative = (req: Request, res: Response, next: NextFunction ) => {
    if(req.body.offset <= 0){
        return res.status(401).json({
            msg: "No se permite números negativos"
        });
    }
    next();
};