import {Request, Response} from "express";
import {IComment, Comment} from "../models/comments.model";

export const addComment = async (req: Request | any, res: Response) => {
    const {comment, state} = req.body;

    const data: IComment = {
        comment,
        state,
        user: req.user._id
    };

    const comments = new Comment(data);

    await comments.save();

    res.status(201).json(comments);
};