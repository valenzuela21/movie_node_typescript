import {Request, Response} from "express";
import {IVote, Vote} from "../models/vote.model";

export const listVoteMovie  =  async (req: Request, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const votes = await Vote.find()
        .sort( { _id: 1 } )
        .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
        .limit( nPerPage );
    return res.status(201).json(votes);
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