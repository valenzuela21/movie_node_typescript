import {Request, Response} from "express";
import {IVote, Vote} from "../models/vote.model";

function calcularPorcentaje(number: string){
    console.log(number);
    return parseInt(number) % 5;
}
export const listGroupVoteByMovie = async (req: Request, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const voteDB = await Vote.aggregate(
        [
            {
                $group: {
                    _id: "$movie",
                    vote: {
                        "$sum":"$score"
                    },
                    total: {$sum: 1}
                },

            },
            {"$set": {"vote": {$divide: ["$vote", "$total"]}}},
            {"$skip": pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0},
            {"$limit": nPerPage},
        ]);
    res.status(201).json({
        data: voteDB,
        page: pageNumber + 1,
        limit: nPerPage
    });
};


export const listVoteMovie = async (req: Request, res: Response) => {
    const pageNumber: number = req.body.offset || 1;
    const nPerPage: number = req.body.perpage || 12;
    const votes = await Vote.find()
        .populate("movie")
        .populate("user", ["name", "email"])
        .sort({_id: 1})
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .limit(nPerPage);

    res.status(201).json({
        data: votes,
        page: pageNumber + 1,
        limit: nPerPage
    });
};

export const addVoteMovie = async (req: Request | any, res: Response) => {
    const {score, movie} = req.body;
    const user_id = req.user._id;
    const existScore = await Vote.findOne({user: user_id, movie: movie});
    if (existScore) {
        res.status(401).json({
            msg: "No puedes votar nuevamente, solo una vez..."
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