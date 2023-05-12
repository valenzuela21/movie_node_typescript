import {Request, Response} from "express";
import {IVote, Vote} from "../models/vote.model";

export const listVoteMovie = async (req: Request, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const votes = await Vote.find()
        .populate("movie")
        .populate("user", ["name", "email"])
        .sort({_id: 1})
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .limit(nPerPage);
    return res.status(201).json(votes);
};

export const addVoteMovie = async (req: Request | any, res: Response) => {
    const {score, movie} = req.body;
    const user_id = req.user._id;
    const existScore = await Vote.findOne({user: user_id, movie: movie});
    if(existScore){
        res.status(401).json({
            msg: "No puedes votar..."
        });
        return;
    }


    const data: IVote = {
        score,
        user: user_id,
        movie
    };

    const newScore = new Vote(data);
    await newScore.save();
    res.status(201).json({
        msg: "Se adjunto nueva votación"
    });
};