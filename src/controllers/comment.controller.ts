import {Request, Response} from "express";
import {IComment, Comment} from "../models/comments.model";

export const addComment = async (req: Request | any, res: Response) => {
    const {comment, state, movie} = req.body;

    const data: IComment = {
        comment,
        state,
        user: req.user._id,
        movie
    };

    const comments = new Comment(data);

    await comments.save();

    res.status(201).json(comments);
};