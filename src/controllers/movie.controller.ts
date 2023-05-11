import {Request, Response} from "express";

export const addNewMovie = (req: Request, res: Response) => {
return  res.json({
    msg: "Hola Movie add!"
});
};