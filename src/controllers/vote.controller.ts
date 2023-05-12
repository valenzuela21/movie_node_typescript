import {Request, Response} from "express";
import {IVote, Vote} from "../models/vote.model";
import {ObjectId} from "mongodb";

export const listVoteMovie  =  async (req: Request, res: Response) => {
        res.json({
            msg: "prueba..."
        });
};

export const addVoteMovie  =  async (req: Request, res: Response) => {
   const {score, user, movie} = req.body;
    const data: IVote = {
        score,
        user,
        movie
    };

    const newScore = new Vote(data);
    await newScore.save();
    res.status(201).json({
        msg: "Se adjunto nueva votación"
    });
};