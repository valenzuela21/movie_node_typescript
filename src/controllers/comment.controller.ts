import {Request, Response} from "express";

export const addComment = (req: Request, res: Response) => {
    res.status(201).json({
        msg: "Hello Controller Comment Add"
    });
};